# فرهنگ داده

همهٔ مبالغ ذخیره‌شده تومان صحیح‌اند. تاریخ برش 2026-03-20؛ تقویم گزارش شمسی ۱۴۰۲ تا ۱۴۰۴.

## calendar — 1,096 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| date | TEXT | بله |
| period_id | INTEGER |  |
| jalali_date | TEXT |  |
| year | INTEGER |  |
| month | INTEGER |  |
| day | INTEGER |  |

## campaigns — 540 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| campaign_id | INTEGER | بله |
| company_id | INTEGER |  |
| period_id | INTEGER |  |
| channel | TEXT |  |
| spend_toman | INTEGER |  |

## cash_events — 235,980 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| event_id | INTEGER | بله |
| project_id | INTEGER |  |
| period_id | INTEGER |  |
| category | TEXT |  |
| amount_toman | INTEGER |  |

## companies — 15 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| company_id | INTEGER | بله |
| group_name | TEXT |  |
| company_name | TEXT |  |

## cost_entries — 7,248 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| cost_id | INTEGER | بله |
| project_id | INTEGER |  |
| period_id | INTEGER |  |
| category | TEXT |  |
| amount_toman | INTEGER |  |

## customers — 180 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| customer_id | INTEGER | بله |
| name | TEXT |  |
| segment | TEXT |  |

## dq_audit — 8 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| issue | TEXT | بله |
| rows_count | INTEGER |  |
| action | TEXT |  |

## dq_quarantine — 3,600 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| raw_row | INTEGER | بله |
| order_id | TEXT |  |
| reason | TEXT |  |

## employees — 1,800 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| employee_id | INTEGER | بله |
| project_id | INTEGER |  |
| role | TEXT |  |
| monthly_salary_toman | INTEGER |  |

## inventory_movements — 480,000 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| movement_id | INTEGER | بله |
| order_id | INTEGER |  |
| project_id | INTEGER |  |
| period_id | INTEGER |  |
| kind | TEXT |  |
| quantity | REAL |  |
| value_toman | INTEGER |  |

## invoices — 3,624 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| invoice_id | INTEGER | بله |
| project_id | INTEGER |  |
| customer_id | INTEGER |  |
| period_id | INTEGER |  |
| issue_date | TEXT |  |
| due_date | TEXT |  |
| amount_toman | INTEGER |  |

## leads — 9,720 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| lead_id | INTEGER | بله |
| campaign_id | INTEGER |  |
| status | TEXT |  |
| potential_toman | INTEGER |  |

## materials — 10 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| material_id | INTEGER | بله |
| name | TEXT |  |
| category | TEXT |  |
| unit | TEXT |  |
| base_unit_price_toman | INTEGER |  |

## metadata — 10 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| key | TEXT | بله |
| value | TEXT |  |

## payroll — 54,360 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| payroll_id | INTEGER | بله |
| employee_id | INTEGER |  |
| project_id | INTEGER |  |
| period_id | INTEGER |  |
| amount_toman | INTEGER |  |

## periods — 36 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| period_id | INTEGER | بله |
| jalali_year | INTEGER |  |
| jalali_month | INTEGER |  |
| label | TEXT |  |
| start_date | TEXT |  |
| end_date | TEXT |  |

## project_monthly — 2,160 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| project_id | INTEGER | بله |
| period_id | INTEGER | بله |
| revenue_toman | INTEGER |  |
| cost_toman | INTEGER |  |
| ev_toman | INTEGER |  |
| pv_toman | INTEGER |  |
| progress | REAL |  |
| planned_progress | REAL |  |
| billed_toman | INTEGER |  |

## projects — 60 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| project_id | INTEGER | بله |
| company_id | INTEGER |  |
| customer_id | INTEGER |  |
| name | TEXT |  |
| location | TEXT |  |
| type | TEXT |  |
| start_period | INTEGER |  |
| duration_months | INTEGER |  |
| contract_toman | INTEGER |  |
| budget_toman | INTEGER |  |
| import_share | REAL |  |

## purchase_orders — 240,000 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| order_id | INTEGER | بله |
| project_id | INTEGER |  |
| supplier_id | INTEGER |  |
| material_id | INTEGER |  |
| period_id | INTEGER |  |
| order_date | TEXT |  |
| promised_date | TEXT |  |
| received_date | TEXT |  |
| due_date | TEXT |  |
| amount_toman | INTEGER |  |
| quantity | REAL |  |
| late_days | INTEGER |  |

## receipts — 3,294 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| receipt_id | INTEGER | بله |
| invoice_id | INTEGER |  |
| period_id | INTEGER |  |
| date | TEXT |  |
| amount_toman | INTEGER |  |

## service_tickets — 18,000 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| ticket_id | INTEGER | بله |
| project_id | INTEGER |  |
| period_id | INTEGER |  |
| category | TEXT |  |
| resolution_days | INTEGER |  |
| sla_days | INTEGER |  |
| status | TEXT |  |

## supplier_payments — 227,250 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| payment_id | INTEGER | بله |
| order_id | INTEGER |  |
| period_id | INTEGER |  |
| date | TEXT |  |
| amount_toman | INTEGER |  |

## suppliers — 240 ردیف

| ستون | نوع | کلید اصلی |
|---|---|---|
| supplier_id | INTEGER | بله |
| name | TEXT |  |
| category | TEXT |  |
| strategic | INTEGER |  |