-- HOMA portfolio: SQLite syntax. All money is integer TOMAN.
-- 1. Annual management revenue, cost, margin and YoY (ratio of sums).
WITH y AS (
 SELECT p.jalali_year, SUM(m.revenue_toman) revenue, SUM(m.cost_toman) cost
 FROM project_monthly m JOIN periods p USING(period_id) GROUP BY p.jalali_year
)
SELECT *, 1.0*(revenue-cost)/NULLIF(revenue,0) margin,
 1.0*revenue/NULLIF(LAG(revenue) OVER(ORDER BY jalali_year),0)-1 revenue_yoy FROM y;

-- 2. Earned value: EAC is an indicative estimate if current CPI persists.
SELECT name,group_name,cpi,spi,budget_toman/cpi eac_toman,
 budget_toman/cpi-cost_toman etc_toman
FROM v_project_lifetime WHERE cpi<0.95 OR spi<0.85 ORDER BY spi;

-- 3. Overdue receivables by customer, as of 2026-03-20.
SELECT c.name,SUM(r.balance_toman) outstanding_toman,
 SUM(CASE WHEN overdue_days>0 THEN balance_toman ELSE 0 END) overdue_toman
FROM v_receivables r JOIN customers c USING(customer_id)
WHERE balance_toman>0 GROUP BY c.customer_id ORDER BY overdue_toman DESC;

-- 4. Same-category supplier concentration, not share of unrelated materials.
WITH a AS (
 SELECT s.category,s.name,SUM(p.amount_toman) amount,
 COUNT(*) orders,AVG(CASE WHEN late_days=0 THEN 1.0 ELSE 0 END) on_time
 FROM purchase_orders p JOIN suppliers s USING(supplier_id)
 WHERE period_id BETWEEN 25 AND 36 GROUP BY s.supplier_id
)
SELECT *,1.0*amount/SUM(amount) OVER(PARTITION BY category) category_share FROM a
ORDER BY category,amount DESC;

-- 5. Inventory balance: receipts minus consumption, no transfer model.
SELECT p.name,SUM(CASE WHEN kind='receipt' THEN value_toman ELSE -value_toman END) stock_toman
FROM inventory_movements i JOIN projects p USING(project_id)
GROUP BY project_id ORDER BY stock_toman DESC;

-- 6. Cash reconciliation: financing/tax/dividends outside this simulation.
SELECT 8000000000000 + (SELECT SUM(amount_toman) FROM cash_events)
 - (SELECT SUM(spend_toman) FROM campaigns) closing_cash_toman;

-- 7. Weighted closed-opportunity win rate (open leads excluded).
SELECT channel, SUM(status='won') won,SUM(status='lost') lost,SUM(status='open') open,
 1.0*SUM(status='won')/NULLIF(SUM(status IN ('won','lost')),0) closed_win_rate
FROM leads JOIN campaigns USING(campaign_id) GROUP BY channel;

-- 8. Data cleaning lineage and quarantined rows.
SELECT * FROM dq_audit;
SELECT reason,COUNT(*) rows FROM dq_quarantine GROUP BY reason;
