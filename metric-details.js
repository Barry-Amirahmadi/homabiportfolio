/* Shareable, filter-aware detail pages for every summary card. */
window.HOMA_METRICS = (() => {
  const definitions = {
    revenue: ['درآمد شناسایی‌شده', 'overview', 'درآمد دوره بر اساس پیشرفت واقعی پروژه‌ها شناسایی شده است.', 'جمع درآمد ماهانهٔ پروژه‌های انتخاب‌شده.', 'این شاخص مدل مدیریتی نمونه‌کار است و جایگزین ثبت رسمی حسابداری نیست.'],
    margin: ['حاشیهٔ سود پروژه‌ها', 'overview', 'سهم سود مستقیم پروژه‌ها از درآمد شناسایی‌شده را نشان می‌دهد.', '(درآمد − هزینهٔ مستقیم پروژه) ÷ درآمد.', 'سربار مرکزی، مالیات و هزینهٔ تأمین مالی در این نسبت منظور نشده‌اند.'],
    cash: ['ماندهٔ نقد برآوردی', 'overview', 'ماندهٔ شبیه‌سازی‌شدهٔ نقد در تاریخ برش داده را نشان می‌دهد.', 'ماندهٔ افتتاحیه + دریافت‌ها − پرداخت‌ها − هزینهٔ توسعهٔ بازار.', 'ماندهٔ افتتاحیه برای فیلتر گروه به نسبت ارزش قراردادها تخصیص یافته است.'],
    overdue: ['مطالبات سررسیدگذشته', 'cash', 'بخشی از ماندهٔ مطالبات که از تاریخ سررسید عبور کرده است.', 'جمع ماندهٔ صورتحساب‌های دارای روز تأخیر مثبت.', 'سررسیدگذشته به معنای سوخت‌شدن طلب نیست؛ وضعیت هر کارفرما باید بررسی شود.'],
    remaining: ['ارزش باقی‌ماندهٔ قرارداد', 'projects', 'ارزش قراردادهایی که هنوز به درآمد پروژه تبدیل نشده‌اند.', 'جمع ارزش قرارداد منهای درآمد تجمعی هر پروژه.', 'زمان شناسایی این مبلغ به پیشرفت آیندهٔ پروژه وابسته است.'],
    cpi: ['کارایی هزینهٔ سبد', 'projects', 'نسبت ارزش کسب‌شده به هزینهٔ واقعی سبد پروژه‌ها است.', 'CPI = مجموع EV ÷ مجموع AC.', 'کمتر از ۱ نشانهٔ مصرف هزینه بیش از ارزش کسب‌شده نسبت به خط مبنا است.'],
    spi: ['کارایی زمان سبد', 'projects', 'نسبت ارزش کسب‌شده به ارزش برنامه‌ریزی‌شده را نشان می‌دهد.', 'SPI = مجموع EV ÷ مجموع PV.', 'کمتر از ۱ نشانهٔ عقب‌ماندگی نسبت به برنامهٔ مبنا است.'],
    eac: ['انحراف برآورد تکمیل', 'projects', 'تفاوت هزینهٔ برآوردی پایان کار با بودجهٔ مصوب پروژه‌ها است.', 'برای پروژهٔ باز EAC = BAC ÷ CPI؛ انحراف = EAC − BAC.', 'این برآورد ادامهٔ کارایی هزینهٔ فعلی را فرض می‌کند و جایگزین برآورد مهندسی نیست.'],
    ar: ['مطالبات باز', 'cash', 'ماندهٔ صورتحساب‌هایی است که هنوز دریافت نشده‌اند.', 'مبلغ صورتحساب منهای مجموع دریافت‌های مربوط.', 'ماندهٔ باز شامل مطالبات سررسیدنشده نیز هست.'],
    ap: ['بدهی باز به تأمین‌کنندگان', 'cash', 'ماندهٔ پرداخت‌نشدهٔ تعهدات خرید در تاریخ برش است.', 'جمع ماندهٔ سفارش‌های خرید پس از پرداخت.', 'مقایسه با پرداخت‌های گذشته فقط برای شناخت فشار نقدی است، نه پیش‌بینی قطعی.'],
    orders: ['سفارش خرید', 'procurement', 'تعداد سفارش‌های خرید ثبت‌شده در دورهٔ انتخابی است.', 'جمع تعداد سفارش‌ها در دادهٔ تأمین پروژه‌های انتخاب‌شده.', 'هر سفارش در دادهٔ فرضی یک قلم مصالح دارد.'],
    purchases: ['ارزش خرید مصالح', 'procurement', 'ارزش سفارش‌های مصالح در دوره را نشان می‌دهد.', 'جمع مبلغ سفارش‌های خرید ثبت‌شده.', 'ارزش خرید با هزینهٔ مصالح مصرف‌شده در همان دوره برابر نیست.'],
    ontime: ['تحویل به‌موقع', 'procurement', 'سهم سفارش‌هایی است که تا تاریخ وعده‌داده‌شده تحویل شده‌اند.', '(تعداد سفارش − تعداد تحویل دیرهنگام) ÷ تعداد سفارش.', 'نرخ کل از تعداد سفارش‌ها محاسبه می‌شود، نه میانگین نرخ تأمین‌کنندگان.'],
    inventory: ['موجودی مصالح پایان دوره', 'procurement', 'ماندهٔ ارزش مصالح در تاریخ برش داده است.', 'جمع تغییرات ثبت‌شدهٔ موجودی مصالح پروژه‌های انتخاب‌شده.', 'ارزش موجودی، وجه نقد آزاد یا صرفه‌جویی محقق‌شده نیست.'],
    b2b: ['درآمد قراردادهای B2B', 'customers', 'درآمد شناسایی‌شدهٔ قراردادهای ساخت‌وساز با کارفرمایان سازمانی است.', 'جمع درآمد ماهانه بر مبنای پیشرفت واقعی پروژه‌ها.', 'فرصت‌های فروش باز در این مبلغ منظور نشده‌اند.'],
    leads: ['فرصت فروش شناسایی‌شده', 'customers', 'تعداد فرصت‌های تجاری ثبت‌شده در دوره است.', 'جمع فرصت‌ها در کمپین‌ها و کانال‌های توسعه بازار.', 'فرصت شناسایی‌شده الزاماً به قرارداد تبدیل نمی‌شود.'],
    winrate: ['نرخ برد فرصت‌های بسته', 'customers', 'سهم فرصت‌های برنده از فرصت‌های تعیین‌تکلیف‌شده است.', 'فرصت برنده ÷ (کل فرصت − فرصت باز).', 'فرصت‌های باز از مخرج حذف می‌شوند.'],
    marketing: ['هزینهٔ توسعهٔ بازار', 'customers', 'مبلغ صرف‌شده برای ایجاد و پیگیری فرصت‌های تجاری است.', 'جمع هزینهٔ کمپین‌ها در دورهٔ انتخابی.', 'این هزینه جدا از هزینهٔ مستقیم اجرای پروژه محاسبه شده است.'],
    workforce: ['نیروی انسانی تخصیص‌یافته', 'people', 'تعداد نیروی تخصیص‌یافته به پروژه‌های انتخاب‌شده است.', 'جمع نفرات ثبت‌شده به تفکیک نقش و پروژه.', 'تعداد نیرو در سناریوی داده ثابت فرض شده است.'],
    payroll: ['هزینهٔ حقوق و دستمزد', 'people', 'هزینهٔ نیروی انسانی ثبت‌شده برای پروژه‌ها در دوره است.', 'جمع ریز هزینه‌های دستهٔ حقوق و دستمزد.', 'این مبلغ بخشی از هزینهٔ مستقیم پروژه و با ریز پرداخت‌ها قابل تطبیق است.'],
    tickets: ['درخواست‌های ثبت‌شده', 'people', 'تعداد درخواست‌های خدمت و کیفیت ثبت‌شده برای پروژه‌ها است.', 'جمع درخواست‌های ماهانهٔ پروژه‌های انتخاب‌شده.', 'افزایش درخواست به‌تنهایی افت کیفیت را ثابت نمی‌کند.'],
    sla: ['حل درخواست در SLA', 'people', 'سهم درخواست‌هایی است که در مهلت هفت‌روزه حل شده‌اند.', '(کل درخواست − درخواست خارج از SLA) ÷ کل درخواست.', 'نرخ رعایت SLA ابزار پایش است و به‌تنهایی علت تأخیر را نشان نمی‌دهد.'],
  };
  const routeForTitle = Object.fromEntries(Object.entries(definitions).map(([id, item]) => [item[0], id]));
  const title = id => definitions[id]?.[0];
  const sourcePage = id => definitions[id]?.[1] || 'overview';

  function render(id, c, h) {
    const { D, sum, money, unit, fa, percent, lineChart, bars, panel, scatter, forecast, projectMap, customerMap, supplierMap } = h;
    const [heading, defaultOrigin, explanation, formula, caveat] = definitions[id];
    const origin = h.returnPage && h.pages[h.returnPage] ? h.returnPage : defaultOrigin;
    const labels = c.periods.map(p => p.label.split(' ')[0]);
    const monthly = key => c.periods.map(p => sum(c.m.filter(x => x.period_id === p.period_id), key));
    const top = (items, n = 6) => [...items].sort((a, b) => b.value - a.value).slice(0, n);
    const amount = (n, suffix = unit()) => ({ value: money(n), suffix });
    const rate = n => ({ value: percent(n), suffix: '' });
    const count = (n, suffix) => ({ value: fa(n), suffix });
    const chart = (names, series, opts) => lineChart(names, series, opts);
    const gold = '#d79d4b', purple = '#833ca3', red = '#ad4455';
    const revenue = monthly('revenue_toman'), cost = monthly('cost_toman');
    const age = [
      { name: 'سررسید نشده', value: sum(c.ar.filter(x => !x.overdue_days), 'balance_toman') },
      { name: '۱ تا ۳۰ روز', value: sum(c.ar.filter(x => x.overdue_days > 0 && x.overdue_days <= 30), 'balance_toman') },
      { name: '۳۱ تا ۹۰ روز', value: sum(c.ar.filter(x => x.overdue_days > 30 && x.overdue_days <= 90), 'balance_toman') },
      { name: '۹۱ تا ۱۸۰ روز', value: sum(c.ar.filter(x => x.overdue_days > 90 && x.overdue_days <= 180), 'balance_toman') },
      { name: 'بیش از ۱۸۰ روز', value: sum(c.ar.filter(x => x.overdue_days > 180), 'balance_toman') },
    ];
    const clients = Object.values(c.ar.reduce((acc, x) => {
      const row = acc[x.customer_id] ||= { name: customerMap[x.customer_id].name, value: 0, overdue: 0 };
      row.value += x.balance_toman;
      if (x.overdue_days > 0) row.overdue += x.balance_toman;
      return acc;
    }, {}));
    const purchaseRows = D.supply.filter(x => c.ids.has(x[0]) && c.periodIds.has(x[1]));
    const supplierRows = Object.values(purchaseRows.reduce((acc, x) => {
      const row = acc[x[2]] ||= { name: supplierMap[x[2]].name, value: 0, orders: 0, late: 0 };
      row.value += x[4]; row.orders += x[3]; row.late += x[5];
      return acc;
    }, {}));
    const campaigns = c.campaigns;
    const byPeriod = (rows, key) => c.periods.map(p => sum(rows.filter(x => x.period_id === p.period_id), key));
    const payroll = D.costs.filter(x => c.ids.has(x.project_id) && c.periodIds.has(x.period_id) && x.category === 'payroll');
    let main, first, second;
    switch (id) {
      case 'revenue':
      case 'b2b': {
        main = amount(c.revenue);
        first = ['روند درآمد و هزینه', chart(labels, [{ name: 'درآمد', values: revenue, color: purple }, { name: 'هزینهٔ پروژه', values: cost, color: gold }])];
        const projects = top(c.projects.map(p => ({ name: p.name, value: sum(c.m.filter(x => x.project_id === p.project_id), 'revenue_toman') })));
        second = [id === 'b2b' ? 'پروژه‌های دارای بیشترین درآمد' : 'سهم پروژه‌ها از درآمد دوره', bars(projects)];
        break;
      }
      case 'margin':
        main = rate(c.margin);
        first = ['روند حاشیهٔ سود ماهانه', chart(labels, [{ name: 'حاشیهٔ سود', values: revenue.map((v, i) => v ? (v - cost[i]) / v : 0), color: purple }], { format: percent })];
        second = ['سود مستقیم پروژه‌های برتر', bars(top(c.projects.map(p => { const rows = c.m.filter(x => x.project_id === p.project_id); return { name: p.name, value: sum(rows, 'revenue_toman') - sum(rows, 'cost_toman') }; })))];
        break;
      case 'cash': {
        main = amount(c.cash);
        let running = c.opening;
        const cashByPeriod = D.periods.map(p => {
          running += sum(c.all.filter(x => x.period_id === p.period_id), 'receipts_toman') - sum(c.all.filter(x => x.period_id === p.period_id), 'payments_toman') - sum(c.allCampaigns.filter(x => x.period_id === p.period_id), 'spend_toman');
          return running;
        });
        first = ['مسیر ماندهٔ نقد تا تاریخ برش', chart(labels, [{ name: 'ماندهٔ نقد', values: c.periods.map(p => cashByPeriod[p.period_id - 1]), color: purple }], { minZero: false })];
        const f = forecast(c);
        second = ['چشم‌انداز سناریویی ۱۳ هفته', chart(['امروز', ...Array.from({ length: 13 }, (_, i) => 'هفته ' + fa(i + 1))], [{ name: 'سناریوی پایه', values: f.base, color: gold }, { name: 'فرض‌های تصمیم', values: f.scenario, color: purple }], { minZero: false })];
        break;
      }
      case 'overdue':
        main = amount(sum(c.ar.filter(x => x.overdue_days > 0), 'balance_toman'));
        first = ['سن مطالبات', bars(age)];
        second = ['کارفرمایان دارای بزرگ‌ترین ماندهٔ معوق', bars(top(clients.map(x => ({ name: x.name, value: x.overdue }))))];
        break;
      case 'remaining':
        main = amount(sum(c.projects, p => p.contract_toman - p.revenue_toman));
        first = ['بیشترین ماندهٔ قرارداد در پروژه‌ها', bars(top(c.projects.map(p => ({ name: p.name, value: p.contract_toman - p.revenue_toman }))))];
        second = ['روند درآمد شناسایی‌شده در دوره', chart(labels, [{ name: 'درآمد', values: revenue, color: purple }])];
        break;
      case 'cpi':
      case 'spi': {
        const ev = sum(c.projects, 'ev_toman');
        const denominator = sum(c.projects, id === 'cpi' ? 'cost_toman' : 'pv_toman');
        main = { value: fa(denominator ? ev / denominator : 0, 2), suffix: id.toUpperCase() };
        first = ['نقشهٔ کارایی زمان و هزینه', scatter(c.projects)];
        const gaps = top(c.projects.map(p => ({ name: p.name, value: Math.max(0, (id === 'cpi' ? 1 - p.cpi : p.planned_progress - p.progress) * 100), note: 'واحد درصد' })));
        second = [id === 'cpi' ? 'بیشترین فاصلهٔ CPI از ۱' : 'بیشترین عقب‌ماندگی پیشرفت', bars(gaps, { count: true })];
        break;
      }
      case 'eac': {
        const variance = c.projects.map(p => ({ name: p.name, value: (p.progress >= 1 ? p.cost_toman : p.budget_toman / p.cpi) - p.budget_toman }));
        main = amount(sum(variance, 'value'));
        first = ['پروژه‌های دارای بیشترین انحراف مثبت', bars(top(variance.map(x => ({ ...x, value: Math.max(0, x.value) }))))];
        second = ['موقعیت پروژه‌ها در کارایی زمان و هزینه', scatter(c.projects)];
        break;
      }
      case 'ar':
        main = amount(sum(c.ar, 'balance_toman'));
        first = ['ترکیب سنی ماندهٔ مطالبات', bars(age)];
        second = ['بزرگ‌ترین مانده‌ها به تفکیک کارفرما', bars(top(clients))];
        break;
      case 'ap':
        main = amount(sum(c.ap, 'balance_toman'));
        first = ['بدهی باز به تفکیک پروژه', bars(top(c.ap.map(x => ({ name: projectMap[x.project_id].name, value: x.balance_toman }))))];
        second = ['پرداخت‌های ماهانهٔ پروژه‌ها', chart(labels, [{ name: 'پرداخت', values: monthly('payments_toman'), color: gold }])];
        break;
      case 'orders':
        main = count(sum(purchaseRows, x => x[3]), 'سفارش');
        first = ['روند ماهانهٔ سفارش خرید', chart(labels, [{ name: 'سفارش', values: monthly('orders'), color: purple }], { format: n => fa(n) })];
        second = ['تأمین‌کنندگان دارای بیشترین سفارش', bars(top(supplierRows.map(x => ({ name: x.name, value: x.orders, note: 'سفارش' }))), { count: true })];
        break;
      case 'purchases': {
        main = amount(sum(purchaseRows, x => x[4]));
        first = ['روند ارزش خرید', chart(labels, [{ name: 'خرید مصالح', values: monthly('purchase_toman'), color: purple }])];
        const cats = Object.values(purchaseRows.reduce((acc, x) => {
          const name = supplierMap[x[2]].category;
          (acc[name] ||= { name, value: 0 }).value += x[4];
          return acc;
        }, {}));
        second = ['ترکیب خرید به گروه مصالح', bars(top(cats, 10))];
        break;
      }
      case 'ontime': {
        const orders = sum(purchaseRows, x => x[3]), late = sum(purchaseRows, x => x[5]);
        main = rate(orders ? (orders - late) / orders : 0);
        const orderMonths = monthly('orders'), lateMonths = monthly('late_orders');
        first = ['نرخ تحویل به‌موقع در ماه‌های دوره', chart(labels, [{ name: 'تحویل به‌موقع', values: orderMonths.map((v, i) => v ? (v - lateMonths[i]) / v : 0), color: purple }], { format: percent })];
        second = ['بیشترین سفارش‌های دیرهنگام', bars(top(supplierRows.map(x => ({ name: x.name, value: x.late, note: 'سفارش دیرهنگام' }))), { count: true })];
        break;
      }
      case 'inventory': {
        main = amount(sum(c.all, 'stock_delta_toman'));
        let running = 0;
        const stock = D.periods.map(p => running += sum(c.all.filter(x => x.period_id === p.period_id), 'stock_delta_toman'));
        first = ['مسیر ارزش موجودی مصالح', chart(labels, [{ name: 'موجودی', values: c.periods.map(p => stock[p.period_id - 1]), color: purple }])];
        second = ['ماندهٔ موجودی به تفکیک پروژه', bars(top(c.projects.map(p => ({ name: p.name, value: sum(c.all.filter(x => x.project_id === p.project_id), 'stock_delta_toman') }))))];
        break;
      }
      case 'leads':
        main = count(sum(campaigns, 'leads'), 'فرصت');
        first = ['روند فرصت و برد', chart(labels, [{ name: 'فرصت', values: byPeriod(campaigns, 'leads'), color: purple }, { name: 'برنده', values: byPeriod(campaigns, 'wins'), color: gold }], { format: n => fa(n) })];
        second = ['فرصت‌ها به تفکیک کانال', bars(['مناقصه', 'ارتباط سازمانی', 'نمایشگاه'].map(name => ({ name, value: sum(campaigns.filter(x => x.channel === name), 'leads'), note: 'فرصت' })), { count: true })];
        break;
      case 'winrate': {
        const closed = sum(campaigns, 'leads') - sum(campaigns, 'open_leads');
        main = rate(closed ? sum(campaigns, 'wins') / closed : 0);
        const leads = byPeriod(campaigns, 'leads'), open = byPeriod(campaigns, 'open_leads'), wins = byPeriod(campaigns, 'wins');
        first = ['روند نرخ برد فرصت‌های بسته', chart(labels, [{ name: 'نرخ برد', values: leads.map((v, i) => v - open[i] ? wins[i] / (v - open[i]) : 0), color: purple }], { format: percent })];
        second = ['فرصت‌های برنده به تفکیک کانال', bars(['مناقصه', 'ارتباط سازمانی', 'نمایشگاه'].map(name => ({ name, value: sum(campaigns.filter(x => x.channel === name), 'wins'), note: 'فرصت برنده' })), { count: true })];
        break;
      }
      case 'marketing':
        main = amount(sum(campaigns, 'spend_toman'));
        first = ['روند هزینهٔ توسعهٔ بازار', chart(labels, [{ name: 'هزینه', values: byPeriod(campaigns, 'spend_toman'), color: purple }])];
        second = ['هزینه به تفکیک کانال', bars(['مناقصه', 'ارتباط سازمانی', 'نمایشگاه'].map(name => ({ name, value: sum(campaigns.filter(x => x.channel === name), 'spend_toman') })))];
        break;
      case 'workforce': {
        const people = D.people.filter(x => c.ids.has(x.project_id));
        main = count(sum(people, 'headcount'), 'نفر');
        first = ['ترکیب نیرو به تفکیک نقش', bars(['مهندس', 'تکنسین', 'کارشناس پروژه', 'سرپرست', 'کارگر ماهر'].map(name => ({ name, value: sum(people.filter(x => x.role === name), 'headcount'), note: 'نفر' })), { count: true })];
        second = ['پروژه‌های دارای بیشترین نیروی تخصیص‌یافته', bars(top(c.projects.map(p => ({ name: p.name, value: sum(people.filter(x => x.project_id === p.project_id), 'headcount'), note: 'نفر' }))), { count: true })];
        break;
      }
      case 'payroll':
        main = amount(sum(payroll, 'amount_toman'));
        first = ['روند هزینهٔ حقوق و دستمزد', chart(labels, [{ name: 'حقوق و دستمزد', values: byPeriod(payroll, 'amount_toman'), color: purple }])];
        second = ['پروژه‌های دارای بیشترین هزینهٔ نیروی انسانی', bars(top(c.projects.map(p => ({ name: p.name, value: sum(payroll.filter(x => x.project_id === p.project_id), 'amount_toman') }))))];
        break;
      case 'tickets':
        main = count(sum(c.m, 'tickets'), 'درخواست');
        first = ['روند درخواست‌های ثبت‌شده', chart(labels, [{ name: 'درخواست', values: monthly('tickets'), color: purple }, { name: 'خارج از SLA', values: monthly('breached_tickets'), color: red }], { format: n => fa(n) })];
        second = ['پروژه‌های دارای بیشترین درخواست', bars(top(c.projects.map(p => ({ name: p.name, value: sum(c.m.filter(x => x.project_id === p.project_id), 'tickets'), note: 'درخواست' }))), { count: true })];
        break;
      case 'sla': {
        const tickets = sum(c.m, 'tickets'), breached = sum(c.m, 'breached_tickets');
        main = rate(tickets ? (tickets - breached) / tickets : 0);
        const ts = monthly('tickets'), bad = monthly('breached_tickets');
        first = ['روند رعایت SLA', chart(labels, [{ name: 'رعایت SLA', values: ts.map((v, i) => v ? (v - bad[i]) / v : 0), color: purple }], { format: percent })];
        second = ['پروژه‌های دارای بیشترین عبور از SLA', bars(top(c.projects.map(p => ({ name: p.name, value: sum(c.m.filter(x => x.project_id === p.project_id), 'breached_tickets'), note: 'درخواست' }))), { count: true })];
        break;
      }
    }
    const sourceTitle = h.pages[origin][0];
    const viz = html => `<div class="metric-viz">${html}</div>${html.includes('class="chart"') ? '<p class="metric-scroll-hint">برای دیدن همهٔ ماه‌ها، نمودار افقی جابه‌جا شود.</p>' : ''}`;
    return `<a class="metric-back" href="#${origin}">→ بازگشت به ${sourceTitle}</a>
      <section class="metric-lead glass"><div><span class="eyebrow">METRIC DETAIL / ${id.toUpperCase()}</span><h2>${heading}</h2><p>${explanation}</p></div><div class="metric-lead-value"><strong>${main.value}</strong><span>${main.suffix}</span></div></section>
      <div class="grid-equal metric-charts">${panel(first[0], 'بر اساس فیلترهای انتخاب‌شده', viz(first[1]))}${panel(second[0], 'همان دامنهٔ داده و واحد نمایش', viz(second[1]))}</div>
      <section class="metric-method glass"><div><h3>روش محاسبه</h3><p>${formula}</p></div><div><h3>نکتهٔ تفسیر</h3><p>${caveat}</p></div><a href="#${origin}">نمای ${sourceTitle} ←</a></section>`;
  }
  return { definitions, routeForTitle, title, sourcePage, render };
})();
