// src/i18n/translations.ts
//
// Central translation table. The site ships in two languages:
//   - Arabic  ('ar') — default. RTL.
//   - English ('en') — secondary. LTR.
//
// Use the `useT()` hook from LanguageContext to pull strings. Categories
// are a special case (see CATEGORIES) because they are referenced from
// the database as English keys.

export type Lang = 'ar' | 'en'

export const CATEGORIES = [
  { key: 'Living',   ar: 'غرف معيشة',  en: 'Living'   },
  { key: 'Bedroom',  ar: 'غرف نوم',    en: 'Bedroom'  },
  { key: 'Kitchen',  ar: 'مطابخ',      en: 'Kitchen'  },
  { key: 'Bathroom', ar: 'دورات مياه', en: 'Bathroom' },
  { key: 'Dining',   ar: 'صالة طعام',  en: 'Dining'   },
  { key: 'Office',   ar: 'مكاتب',      en: 'Office'   },
  { key: 'Kids',     ar: 'غرف أطفال',  en: 'Kids'     },
] as const

export type CategoryKey = (typeof CATEGORIES)[number]['key']

export function categoryName(key: string, lang: Lang): string {
  const c = CATEGORIES.find((x) => x.key === key)
  if (!c) return key
  return lang === 'ar' ? c.ar : c.en
}

const T = {
  /* ------------------ Brand ------------------ */
  brand: {
    name:    { ar: 'تولكان',          en: 'ToolCan' },
    tagline: { ar: 'الديكور',         en: 'Decoration' },
  },

  /* ------------------ Nav ------------------ */
  nav: {
    home:        { ar: 'الرئيسية',     en: 'Home' },
    gallery:     { ar: 'المعرض',       en: 'Gallery' },
    about:       { ar: 'من نحن',       en: 'About' },
    contact:     { ar: 'تواصل',        en: 'Contact' },
    exitAdmin:   { ar: 'الخروج من الإدارة', en: 'Exit admin' },
    skipToContent:{ ar: 'تخطّي إلى المحتوى', en: 'Skip to content' },
    primaryNav:  { ar: 'القائمة الرئيسية', en: 'Primary' },
  },

  /* ------------------ Footer ------------------ */
  footer: {
    blurb: {
      ar: 'استوديو ديكور داخلي صغير يصوغ غرفاً هادئة ومدروسة لعملائنا في المنطقة.',
      en: 'A small interior decoration studio shaping quiet, considered rooms for clients across the region.',
    },
    columns: {
      explore: { ar: 'استكشف',   en: 'Explore' },
      studio:  { ar: 'الاستوديو', en: 'Studio' },
      connect: { ar: 'تواصل',     en: 'Connect' },
    },
    studio: {
      appointment:  { ar: 'بموعد مسبق',   en: 'By appointment' },
      hours:        { ar: 'الإثنين — الجمعة، ١٠–١٨', en: 'Mon — Fri, 10–18' },
      email:        { ar: 'khayratum@gmail.com',       en: 'khayratum@gmail.com' },
    },
    connect: {
      tiktok:    { ar: 'تيك توك',     en: 'TikTok' },
      snap:      { ar: 'سناب شات',    en: 'Snapchat' },
      instagram: { ar: 'إنستغرام',    en: 'Instagram' },
      x:         { ar: 'إكس',          en: 'X' },
      admin:     { ar: 'دخول الاستوديو', en: 'Studio admin' },
    },
    legal: {
      policies: { ar: 'السياسات', en: 'Policies' },
    },
    quickTitle:   { ar: 'روابط سريعة', en: 'Quick links' },
    contactTitle: { ar: 'تواصل معنا', en: 'Contact us' },
    trustTitle:   { ar: 'ثقة وتوثيق', en: 'Trust & verification' },
    certified:    { ar: 'موثّق في منصة الأعمال', en: 'Verified business' },
    crLabel:      { ar: 'السجل التجاري', en: 'Commercial registration' },
    whatsapp:     { ar: 'واتساب', en: 'WhatsApp' },
    complaints:   { ar: 'الشكاوى والاقتراحات', en: 'Complaints & suggestions' },
    paymentsTitle: { ar: 'وسائل الدفع', en: 'Payment methods' },
    payments: {
      mada:       { ar: 'مدى', en: 'mada' },
      visa:       { ar: 'Visa', en: 'Visa' },
      mastercard: { ar: 'Mastercard', en: 'Mastercard' },
      amex:       { ar: 'AMEX', en: 'AMEX' },
      applePay:   { ar: 'Apple Pay', en: 'Apple Pay' },
      bank:       { ar: 'تحويل بنكي', en: 'Bank transfer' },
      cod:        { ar: 'الدفع عند الاستلام', en: 'Cash on delivery' },
    },
    copyright: {
      ar: '© ${year} تولكان للديكور · جميع الحقوق محفوظة',
      en: '© ${year} ToolCan Decoration · All rights reserved',
    },
    group: {
      ar: 'أحد استوديوهات مجموعة تولكان',
      en: 'Part of the ToolCan group of studios',
    },
  },

  /* ------------------ Home ------------------ */
  home: {
    hero: {
      eyebrow:    { ar: 'تولكان · الديكور', en: 'ToolCan · Decoration' },
      title1:     { ar: 'غرفٌ هادئة،',     en: 'Quiet rooms,' },
      titleEm:    { ar: 'ببطءٍ',            en: 'slowly' },
      title2:     { ar: 'صُنعت.',           en: 'made.' },
      body: {
        ar: 'استوديو ديكور داخلي يصوغ مساحاتٍ دافئةً ومدروسة من ورشة صغيرة. ألوان ناعمة، مواد أصيلة، غرف تتنفّس.',
        en: 'An interior decoration studio shaping warm, considered spaces from a small workshop. Soft palettes, honest materials, rooms that breathe.',
      },
      cta1: { ar: 'شاهد الأعمال', en: 'See the work' },
      cta2: { ar: 'ابدأ مشروعاً', en: 'Start a project' },
      slides: [
        {
          subtitle: { ar: 'تصميم داخلي & ديكورات منزلية', en: 'Interior Design & Home Décor' },
          title: { ar: 'نحوّل منزلك إلى', en: 'We transform your home into a' },
          highlight: { ar: 'تحفة فنية', en: 'masterpiece' },
          description: {
            ar: 'نقدم لكم أفخم التصاميم الداخلية والأثاث المنزلي بأعلى معايير الجودة والإبداع',
            en: 'We offer the finest interior designs and home furniture with the highest standards of quality and creativity',
          },
        },
        {
          subtitle: { ar: 'صالات استقبال فاخرة', en: 'Luxury Reception Halls' },
          title: { ar: 'أناقة تليق', en: 'Elegance that matches' },
          highlight: { ar: 'بذوقك الرفيع', en: 'your refined taste' },
          description: {
            ar: 'تصاميم صالات استقبال بلمسات عصرية تجمع بين الفخامة والراحة',
            en: 'Modern reception hall designs that combine luxury and comfort',
          },
        },
        {
          subtitle: { ar: 'غرف نوم حالمة', en: 'Dreamy Bedrooms' },
          title: { ar: 'راحتك تبدأ من', en: 'Your comfort starts with' },
          highlight: { ar: 'تصميمنا', en: 'our design' },
          description: {
            ar: 'غرف نوم مصمّمة بعناية لتمنحك الراحة والهدوء التام',
            en: 'Carefully designed bedrooms to give you the ultimate comfort and tranquility',
          },
        },
      ],
      stats: {
        projects: { ar: 'مشروع منجز', en: 'Projects done' },
        years: { ar: 'سنة خبرة', en: 'Years of experience' },
        designers: { ar: 'مصمم محترف', en: 'Pro designers' },
        satisfaction: { ar: 'رضا العملاء', en: 'Client satisfaction' },
      },
    },
    services: {
      eyebrow: { ar: 'خدماتنا', en: 'What we offer' },
      title: { ar: 'ماذا نقدم', en: 'Our services' },
      items: [
        {
          title: { ar: 'التصميم الداخلي', en: 'Interior Design' },
          description: {
            ar: 'تصاميم داخلية مبتكرة تعكس ذوقك وأسلوب حياتك، من التخطيط الأولي حتى التنفيذ النهائي',
            en: 'Innovative interior designs that reflect your taste and lifestyle, from initial planning to final execution',
          },
        },
        {
          title: { ar: 'الديكور المنزلي', en: 'Home Décor' },
          description: {
            ar: 'نختار أرقى قطع الديكور والإكسسوارات التي تضيف لمسة فنية لكل زاوية في منزلك',
            en: 'We select the finest décor and accessories that add an artistic touch to every corner of your home',
          },
        },
        {
          title: { ar: 'الأثاث المنزلي', en: 'Home Furniture' },
          description: {
            ar: 'تصميم وتوريد أثاث عصري وكلاسيكي بأعلى جودة تناسب جميع الأذواق والمساحات',
            en: 'Design and supply of modern and classic furniture of the highest quality for all tastes and spaces',
          },
        },
        {
          title: { ar: 'معاينة ثلاثية الأبعاد', en: '3D Visualization' },
          description: {
            ar: 'نوفر تصاميم ثلاثية الأبعاد واقعية لتتخيل منزلك قبل البدء بالتنفيذ',
            en: 'We provide realistic 3D designs so you can visualize your home before starting',
          },
        },
      ],
    },
    testimonials: {
      eyebrow: { ar: 'آراء العملاء', en: 'Testimonials' },
      title: { ar: 'ماذا يقول عملاؤنا', en: 'What our clients say' },
      empty: {
        ar: 'لا توجد آراء منشورة بعد.',
        en: 'No testimonials published yet.',
      },
    },
    intro: {
      eyebrow: { ar: 'عن الاستوديو',   en: 'About the studio' },
      title1:  { ar: 'نصنع غرفاً',     en: 'We make rooms that' },
      titleEm: { ar: 'تتنفس',          en: 'exhale' },
      body1: {
        ar: 'تولكان للديكور هو أحد استوديوهات مجموعة تولكان. نعمل على عدد قليل من المشاريع في كل مرة — غرف معيشة، غرف نوم، مطابخ، حمامات، الغرف التي يعيش فيها الناس فعلاً.',
        en: 'ToolCan Decoration is one of the studios under the ToolCan group. We work on a small number of projects at a time — living rooms, bedrooms, kitchens, bathrooms, the rooms people actually live in.',
      },
      body2: {
        ar: 'منهجنا متأنٍّ. نبدأ من الغرفة وكيف تُستخدم؛ التصميم يأتي بعدها. النتيجة هي ديكورٌ يبدو حتمياً لا مُزيَّفاً.',
        en: 'Our approach is unhurried. We start with the room and how it wants to be used; the design follows. The result is decoration that feels inevitable rather than decorated.',
      },
    },
    selected: {
      eyebrow: { ar: 'أعمال مختارة',         en: 'Selected work' },
      title:   { ar: 'ست غرف من الاستوديو',  en: 'Six rooms from the studio' },
      cta:     { ar: 'شاهد المعرض كاملاً',   en: 'View the full gallery' },
      loading: { ar: 'جاري تحميل أعمال الاستوديو…', en: 'Loading the studio’s work…' },
    },
    stats: {
      eyebrow: { ar: 'الأرقام', en: 'By the numbers' },
      title:   { ar: 'معرضٌ ينمو مع كل مشروع', en: 'A gallery that grows with each project' },
      subtitle: {
        ar: 'الأرقام أدناه محدَّثة من قاعدة البيانات. أضف صورةً جديدةً فيتغيّر العدّ.',
        en: 'Counts below are live from the database. Add a new image and the tally updates.',
      },
      total:   { ar: 'مشروع في المعرض', en: 'projects in the gallery' },
    },
    process: {
      eyebrow: { ar: 'كيف نعمل',         en: 'How we work' },
      title:   { ar: 'عمليةٌ تتأنَّى',   en: 'A process that takes its time' },
      subtitle:{
        ar: 'أربع مراحل، عادةً على مدى بضعة أشهر. الجزء المتأني هو بيت القصيد.',
        en: 'Four stages, typically over a few months. The unhurried parts are the point.',
      },
      steps: [
        {
          title: { ar: 'الاكتشاف', en: 'Discover' },
          body:  {
            ar: 'حوارٌ طويل في المساحة نفسها. كيف تعيش، ما الشعور الذي تريده للغرفة، ماذا يمكنك أن تتخلى عنه.',
            en: 'A long conversation at the space. How you live, what you want the room to feel like, what you can let go of.',
          },
        },
        {
          title: { ar: 'التصميم', en: 'Design' },
          body:  {
            ar: 'خطة مدروسة — لوحة ألوان، خامات، إضاءة، توزيع. تُرسم، تُراجَع، وتُعتمد قبل شراء أي شيء.',
            en: 'A considered plan — palette, materials, light, layout. Drawn, revised, and signed off before anything is bought.',
          },
        },
        {
          title: { ar: 'التوريد', en: 'Source' },
          body:  {
            ar: 'نعمل مع مجموعة صغيرة مختارة من الصانعين والموردين. القطع تُختار لكيف تتقادم، لا كيف تُصوَّر.',
            en: 'We work with a small, trusted bench of makers and suppliers. Pieces are chosen for how they age, not how they photograph.',
          },
        },
        {
          title: { ar: 'التركيب', en: 'Install' },
          body:  {
            ar: 'في الموقع، بهدوء. تُرتَّب الغرفة، تُزيَّن، تُضاء. تعود إليها وقد اكتملت.',
            en: 'On site, calmly. The room is set up, dressed, and lit. You walk back into it finished.',
          },
        },
      ],
    },
    cta: {
      eyebrow: { ar: 'البداية',  en: 'Begin' },
      title:   { ar: 'هل لديك غرفة في ذهنك؟',  en: 'Have a room in mind?' },
      body: {
        ar: 'أرسل بعض الصور وجملة قصيرة عن كيف تستخدم المساحة. نقرأ كل رسالة ونردّ في نفس الأسبوع.',
        en: 'Send a few photos and a short note about how you use the space. We read every message and write back the same week.',
      },
      button:  { ar: 'تواصل معنا', en: 'Get in touch' },
    },
  },

  /* ------------------ Gallery page ------------------ */
  gallery: {
    eyebrow: { ar: 'المعرض', en: 'The gallery' },
    allLabel: { ar: 'الكل', en: 'All' },
    titleWithCount: {
      ar: '${n} غرفة من الاستوديو',
      en: '${n} rooms from the studio',
    },
    titleFallback: { ar: 'مساحاتٌ، صُنعت ببطء', en: 'Spaces, slowly made' },
    body: {
      ar: 'مجموعة متنامية من المشاريع، مرتّبة حسب الغرفة. انقر على أي صورة لفتحها بحجم أكبر — استخدم مفاتيح الأسهم للتنقل بينها.',
      en: 'A growing collection of projects, by room. Tap any image to open it larger — use the arrow keys to walk through the set.',
    },
    bottomTitle: { ar: 'هل أعجبك ما رأيت؟',   en: 'Like what you see?' },
    bottomBody: {
      ar: 'أرسل بعض الصور وجملة عن المساحة. سنردّ في نفس الأسبوع.',
      en: 'Send a few photos and a sentence about the space. We’ll write back the same week.',
    },
    bottomCta: { ar: 'ابدأ مشروعاً', en: 'Start a project' },
    loading:   { ar: 'جاري تحميل المعرض…', en: 'Loading the gallery…' },
    empty:     {
      ar: 'المعرض قيد الإعداد.',
      sub: 'عُد إلينا قريباً.',
    },
    errorPrefix: { ar: 'تعذّر تحميل المعرض.', en: 'Couldn’t load the gallery.' },
  },

  /* ------------------ Contact page ------------------ */
  contact: {
    eyebrow: { ar: 'تواصل', en: 'Contact' },
    title:   { ar: 'أخبرنا عن الغرفة.', en: 'Tell us about the room.' },
    body: {
      ar: 'نقرأ كل رسالة. ستردّ عليكم خلال خمسة أيام عمل، وغالباً قبل ذلك.',
      en: 'We read every message. You’ll hear back within five working days, usually sooner.',
    },
    form: {
      name:    { ar: 'الاسم',    en: 'Name' },
      email:   { ar: 'البريد الإلكتروني', en: 'Email' },
      phone:   { ar: 'الهاتف',   en: 'Phone' },
      phoneOptional: { ar: 'اختياري', en: 'optional' },
      message: { ar: 'الرسالة',  en: 'Message' },
      messagePh: {
        ar: 'جملة عن المساحة وما الشعور الذي تريده لها.',
        en: 'A sentence about the space and what you’d like it to feel like.',
      },
      submit:  { ar: 'إرسال الرسالة', en: 'Send message' },
      submitting: { ar: 'جاري الإرسال…', en: 'Sending…' },
      sendAnother: { ar: 'إرسال رسالة أخرى', en: 'Send another' },
      success: {
        title: { ar: 'شكراً لك.',  en: 'Thank you.' },
        body:  { ar: 'رسالتك في طريقها إلينا. سنعود إليك قريباً.', en: 'Your message is on its way. We’ll be in touch soon.' },
      },
      errors: {
        required: { ar: 'يرجى تعبئة الاسم والبريد الإلكتروني والرسالة.', en: 'Please fill in name, email, and a short message.' },
        email:    { ar: 'صيغة البريد الإلكتروني غير صحيحة.', en: 'That email doesn’t look quite right.' },
      },
    },
    aside: {
      studio: {
        label:  { ar: 'الاستوديو',  en: 'Studio' },
        title:  { ar: 'بموعد مسبق', en: 'By appointment only' },
        detail: { ar: 'نعمل على عدد قليل من المشاريع في كل مرة.', en: 'We work on a small number of projects at a time.' },
      },
      email: {
        label:  { ar: 'البريد', en: 'Email' },
        title:  { ar: 'khayratum@gmail.com', en: 'khayratum@gmail.com' },
        detail: { ar: 'نرد خلال خمسة أيام عمل.', en: 'We reply within five working days.' },
      },
      hours: {
        label:  { ar: 'ساعات العمل', en: 'Hours' },
        title:  { ar: 'الإثنين — الجمعة، ١٠–١٨', en: 'Mon — Fri, 10–18' },
        detail: { ar: 'التوقيت: +٣ غرينتش', en: 'Time zone: GMT+3' },
      },
    },
  },

  /* ------------------ Admin Login ------------------ */
  adminLogin: {
    eyebrow: { ar: 'الإدارة',  en: 'Admin' },
    title:   { ar: 'تسجيل الدخول', en: 'Sign in' },
    subtitle:{ ar: 'دخول خاص بالاستوديو فقط.', en: 'Studio access only.' },
    email:   { ar: 'البريد الإلكتروني', en: 'Email' },
    password:{ ar: 'كلمة المرور', en: 'Password' },
    submit:  { ar: 'دخول', en: 'Sign in' },
    submitting: { ar: 'جاري الدخول…', en: 'Signing in…' },
    needAccess: { ar: 'تحتاج صلاحية؟', en: 'Need access?' },
    needAccessCta: { ar: 'تواصل معنا', en: 'Get in touch' },
  },

  /* ------------------ Admin Dashboard ------------------ */
  admin: {
    eyebrow:  { ar: 'الاستوديو', en: 'Studio' },
    title:    { ar: 'لوحة التحكم', en: 'Dashboard' },
    tabGallery:   { ar: 'المعرض',      en: 'Gallery' },
    tabMessages:   { ar: 'الرسائل',     en: 'Messages' },
    signOut:       { ar: 'تسجيل الخروج', en: 'Sign out' },
    signingOut:    { ar: 'جاري الخروج…', en: 'Signing out…' },
    preview:       { ar: 'معاينة الموقع', en: 'Preview site' },
    tabHero:        { ar: 'الهيرو',     en: 'Hero' },
    tabServices:    { ar: 'الخدمات',    en: 'Services' },
    tabWorks:       { ar: 'الأعمال',    en: 'Works' },
    tabCategories:  { ar: 'التصنيفات',  en: 'Categories' },
    tabTestimonials:{ ar: 'الآراء',     en: 'Testimonials' },
    tabInvoices:    { ar: 'الفواتير',   en: 'Invoices' },
    newBadge:      { ar: '${n} جديدة', en: '${n} new' },
    totalMessages: { ar: 'إجمالي: ${n} رسالة', en: 'Total: ${n} messages' },
    selectMessage: { ar: 'اختر رسالة لعرض تفاصيلها', en: 'Select a message to view its details' },
    save:   { ar: 'حفظ', en: 'Save' },
    saving: { ar: 'جاري الحفظ…', en: 'Saving…' },
    saved:  { ar: 'تم الحفظ بنجاح', en: 'Saved successfully' },
    langAr: { ar: 'العربية', en: 'Arabic' },
    langEn: { ar: 'الإنجليزية', en: 'English' },
    heroManager: {
      heading:     { ar: 'محتوى الواجهة (الهيرو)', en: 'Hero content' },
      slide:       { ar: 'شريحة ${n}', en: 'Slide ${n}' },
      subtitle:    { ar: 'العنوان الفرعي', en: 'Subtitle' },
      title:       { ar: 'العنوان', en: 'Title' },
      highlight:   { ar: 'الكلمة المميزة', en: 'Highlighted word' },
      description: { ar: 'الوصف', en: 'Description' },
      statsHeading:{ ar: 'الأرقام', en: 'Stats' },
      years:       { ar: 'سنة خبرة', en: 'Years of experience' },
      designers:   { ar: 'مصمم محترف', en: 'Pro designers' },
      satisfaction:{ ar: 'رضا العملاء ٪', en: 'Client satisfaction %' },
    },
    servicesManager: {
      heading:     { ar: 'الخدمات', en: 'Services' },
      title:       { ar: 'العنوان', en: 'Title' },
      description: { ar: 'الوصف', en: 'Description' },
    },
    categoriesManager: {
      heading: { ar: 'التصنيفات', en: 'Categories' },
      count:   { ar: '${n} صورة', en: '${n} images' },
      visible: { ar: 'ظاهر في الموقع', en: 'Visible on site' },
      hidden:  { ar: 'مخفي', en: 'Hidden' },
      hint:    { ar: 'أظهر أو أخفِ أي تصنيف من المعرض.', en: 'Show or hide any category from the gallery.' },
    },
    testimonialsManager: {
      heading:    { ar: 'آراء العملاء', en: 'Testimonials' },
      addBtn:     { ar: '+ إضافة رأي', en: '+ Add testimonial' },
      emptyTitle: { ar: 'لا توجد آراء بعد.', en: 'No testimonials yet.' },
      emptyBody:  { ar: 'أضف أول رأي لعميل ليظهر في الصفحة الرئيسية.', en: 'Add your first client testimonial to show it on the home page.' },
      name:   { ar: 'الاسم', en: 'Name' },
      body:   { ar: 'الرأي', en: 'Testimonial' },
      rating: { ar: 'التقييم (1-5)', en: 'Rating (1-5)' },
      deleteConfirm: { ar: 'حذف رأي ${name}؟', en: 'Delete the testimonial from ${name}?' },
    },
    invoicesManager: {
      heading:    { ar: 'الفواتير', en: 'Invoices' },
      addBtn:     { ar: '+ إضافة فاتورة', en: '+ Add invoice' },
      emptyTitle: { ar: 'لا توجد فواتير بعد.', en: 'No invoices yet.' },
      emptyBody:  { ar: 'سجّل فواتير مشاريعك وتابع حالتها من هنا.', en: 'Record your project invoices and track their status here.' },
      number: { ar: 'رقم الفاتورة', en: 'Invoice no.' },
      client: { ar: 'العميل', en: 'Client' },
      amount: { ar: 'المبلغ (ر.س)', en: 'Amount (SAR)' },
      status: { ar: 'الحالة', en: 'Status' },
      due:    { ar: 'تاريخ الاستحقاق', en: 'Due date' },
      notes:  { ar: 'ملاحظات', en: 'Notes' },
      statusPaid:    { ar: 'مدفوعة', en: 'Paid' },
      statusUnpaid:  { ar: 'غير مدفوعة', en: 'Unpaid' },
      statusPartial: { ar: 'مدفوعة جزئياً', en: 'Partially paid' },
      deleteConfirm: { ar: 'حذف الفاتورة ${number}؟', en: 'Delete invoice ${number}?' },
      total: { ar: 'الإجمالي', en: 'Total' },
    },
    gallery: {
      heading:     { ar: 'صور المعرض', en: 'Gallery images' },
      addBtn:      { ar: '+ إضافة صورة', en: '+ Add image' },
      emptyTitle:  { ar: 'لا توجد صور بعد.', en: 'No images yet.' },
      emptyBody:   { ar: 'أضف أول صورة لبدء المعرض.', en: 'Add your first image to start the gallery.' },
      editBtn:     { ar: 'تعديل', en: 'Edit' },
      deleteBtn:   { ar: 'حذف',  en: 'Delete' },
      deleteConfirm:{
        ar: 'حذف "${title}"؟ سيُحذف الملف من التخزين أيضاً.',
        en: 'Delete "${title}"? This also removes the file from storage.',
      },
      form: {
        addTitle:    { ar: 'إضافة صورة',    en: 'Add image' },
        editTitle:   { ar: 'تعديل الصورة',  en: 'Edit image' },
        title:       { ar: 'العنوان',        en: 'Title' },
        category:    { ar: 'التصنيف',       en: 'Category' },
        sortOrder:   { ar: 'ترتيب العرض',   en: 'Sort order' },
        description: { ar: 'الوصف',          en: 'Description' },
        file:        { ar: 'ملف الصورة',     en: 'Image file' },
        fileReplace: { ar: 'استبدال الصورة (اختياري)', en: 'Replace image (optional)' },
        fileHint:    { ar: 'JPG أو PNG أو WebP. يُفضَّل حتى ١٠ ميغابايت.', en: 'JPG, PNG, or WebP. Up to 10 MB recommended.' },
        titleRequired:{ ar: 'يرجى إعطاء الصورة عنواناً.', en: 'Please give the image a title.' },
        fileRequired:{ ar: 'يرجى اختيار ملف صورة.',     en: 'Please choose an image file.' },
        save:        { ar: 'حفظ التعديلات',  en: 'Save changes' },
        add:         { ar: 'إضافة الصورة',   en: 'Add image' },
        saving:      { ar: 'جاري الحفظ…',    en: 'Saving…' },
        cancel:      { ar: 'إلغاء',          en: 'Cancel' },
      },
    },
    messages: {
      heading:    { ar: 'رسائل التواصل',   en: 'Contact messages' },
      emptyTitle: { ar: 'لا توجد رسائل بعد.', en: 'No messages yet.' },
      emptyBody:  { ar: 'عندما يرسل زائر رسالة، ستظهر هنا.', en: 'When visitors send a message, it’ll appear here.' },
      markRead:   { ar: 'تحديد كمقروءة',  en: 'Mark as read' },
      markUnread: { ar: 'تحديد كغير مقروءة', en: 'Mark as unread' },
      delete:     { ar: 'حذف',             en: 'Delete' },
      deleteConfirm: { ar: 'حذف رسالة ${name}؟', en: 'Delete the message from ${name}?' },
    },
  },

  /* ------------------ Misc ------------------ */
  misc: {
    backToTop:   { ar: 'العودة للأعلى', en: 'Back to top' },
    switchLangAr: { ar: 'EN',            en: 'AR' },
    switchLangEn: { ar: 'AR',            en: 'EN' },
  },

  /* ------------------ About page ------------------ */
  about: {
    eyebrow: { ar: 'من نحن', en: 'About' },
    title:   { ar: 'استوديو صغير، وغرفٌ بُنيت ببطء.', en: 'A small studio, rooms built slowly.' },
    body1: {
      ar: 'تولكان للديكور هو أحد استوديوهات مجموعة تولكان، يعمل على عددٍ قليل من المشاريع في كل مرة. نعيش في حيٍّ هادئ، ونستقبل المشاريع ببطء — لأن العمل المتأنّي لا يُختصر.',
      en: 'ToolCan Decoration is one of the studios under the ToolCan group, taking on a small number of projects at a time. We work slowly — considered work cannot be rushed.',
    },
    body2: {
      ar: 'نصوغ غرفاً بألوانٍ ناعمة، وموادّ تتقادم بجمال: خشب، حجر، كتان، جص، ونحاس. نختار القطع لكيف تتغيّر مع السنوات، لا كيف تظهر في صورة.',
      en: 'We shape rooms with soft palettes and materials that age well — wood, stone, linen, plaster, brass. We choose pieces for how they change over years, not how they photograph in a moment.',
    },
    body3: {
      ar: 'نبدأ من المحادثة الطويلة، ومن المكان نفسه. ثم نرسم، نُراجع، نُعتمد. ثم نُركّب في الموقع بهدوء. كل مشروع يترك أثره على الاستوديو وعلى مَن فيه.',
      en: 'We start with a long conversation, and with the space itself. Then we draw, revise, and sign off. Then we install on site, calmly. Every project leaves its mark on the studio and on the people in it.',
    },
    valuesEyebrow: { ar: 'قيمنا', en: 'Our values' },
    values: [
      {
        title: { ar: 'الإصغاء قبل التصميم', en: 'Listen before drawing' },
        body:  {
          ar: 'كل غرفة تبدأ بسؤال: كيف تعيش هنا؟ التصميم يأتي بعد الإجابة، لا قبلها.',
          en: 'Every room starts with a question: how do you live here? The design comes after the answer, never before.',
        },
      },
      {
        title: { ar: 'مواد تَعِيش', en: 'Materials that live' },
        body:  {
          ar: 'نختار الخشب والحجر والكتان لما يتقادمون، لا لما يلمعون. الجمال في الثانية لا يكفي.',
          en: 'We pick wood, stone, and linen for how they age, not how they gleam. A moment’s beauty is not enough.',
        },
      },
      {
        title: { ar: 'عدد قليل من المشاريع', en: 'Few projects at a time' },
        body:  {
          ar: 'نرفض أكثر مما نقبل. المشروع الذي يستحق الاهتمام الكامل هو مشروعٌ واحدٌ فقط، لا خمسة.',
          en: 'We turn down more than we take on. A project worth full attention is one, not five.',
        },
      },
      {
        title: { ar: 'الهدوء جزءٌ من العمل', en: 'Quiet is part of the work' },
        body:  {
          ar: 'لا نُعلن عن خطواتنا، ولا نسابق أحداً. النتيجة تظهر في الغرفة، لا على وسائل التواصل.',
          en: 'We don’t announce our steps, and we don’t race anyone. The result shows up in the room, not on social media.',
        },
      },
    ],
  },

  /* ------------------ Policies page ------------------ */
  policies: {
    eyebrow: { ar: 'السياسات', en: 'Policies' },
    title:   { ar: 'كيف نتعامل مع بياناتك وأعمالنا', en: 'How we handle your data and our work' },
    intro:   {
      ar: 'صفحةٌ بسيطة بما نلتزم به. إن كان لديك أي سؤال، راسلنا على البريد أدناه.',
      en: 'A short, plain account of what we commit to. If anything’s unclear, write to the address below.',
    },
    lastUpdated: { ar: 'آخر تحديث', en: 'Last updated' },
    privacy: {
      title: { ar: 'الخصوصية', en: 'Privacy' },
      body: {
        ar: 'نجمع فقط ما نحتاجه: رسائلك عبر النموذج، وملفات الصور التي ترفعها عبر لوحة الإدارة عند الدخول. لا نبيع بياناتك، ولا نشاركها مع طرف ثالث. يمكنك طلب حذفها في أي وقت.',
        en: 'We only collect what we need: the messages you send through the contact form, and the images you upload through the admin dashboard when signed in. We do not sell your data, and we do not share it with third parties. You can ask us to delete it at any time.',
      },
    },
    cookies: {
      title: { ar: 'ملفات تعريف الارتباط', en: 'Cookies & local storage' },
      body: {
        ar: 'نستخدم التخزين المحلي في متصفحك لحفظ اختيار اللغة، وحفظ جلسة تسجيل الدخول للإدارة. لا نضع أي ملفّات تتبّع أو إعلانات.',
        en: 'We use your browser’s local storage to remember your language choice, and to keep you signed in to the admin area. We do not place any tracking or advertising cookies.',
      },
    },
    analytics: {
      title: { ar: 'إحصائيات الزوار', en: 'Visitor analytics' },
      body: {
        ar: 'نسجّل زيارات مجهولة الهوية (الصفحات التي شُوهدت، ومدة البقاء التقريبية) لتحسين الموقع. لا نجمع اسمك أو بريدك إلا إذا أرسلتهما عبر النموذج.',
        en: 'We record anonymous visits (which pages were seen, and rough time spent) to improve the site. We do not collect your name or email unless you send them through the contact form.',
      },
    },
    images: {
      title: { ar: 'حقوق الصور', en: 'Image rights' },
      body: {
        ar: 'جميع الصور في هذا الموقع من أعمال الاستوديو، أو مأذونٌ باستخدامها من أصحابها. لا يحق لأي طرف استخدام هذه الصور دون إذن كتابي منّا.',
        en: 'All photographs in this site are our own work, or used with the owner’s permission. No one may reuse these images without our written consent.',
      },
    },
    contact: {
      title: { ar: 'تواصل', en: 'Get in touch' },
      body: {
        ar: 'لأي استفسار يخص الخصوصية أو استخدام الصور، راسلنا على khayratum@gmail.com.',
        en: 'For any question about privacy or image use, write to khayratum@gmail.com.',
      },
    },
  },

  /* ------------------ Analytics (admin) ------------------ */
  analytics: {
    title:    { ar: 'إحصائيات الزوار', en: 'Visitor analytics' },
    subtitle: { ar: 'بيانات مجهولة الهوية من الزوار (بدون تسجيل دخول).', en: 'Anonymous data from visitors (no login required).' },
    empty:    { ar: 'لا توجد زيارات بعد. تفحّح الموقع من نافذة خاصة لرؤية البيانات تنمو.', en: 'No visits yet. Browse the site from a private window to see the data grow.' },
    kpi: {
      visitors:    { ar: 'زائر فريد',     en: 'Unique visitors' },
      pageViews:    { ar: 'مشاهدة صفحة',   en: 'Page views' },
      avgDuration:  { ar: 'متوسط البقاء',  en: 'Avg. session' },
      todayVisitors:{ ar: 'زوار اليوم',     en: 'Today' },
    },
    dailyHeading: { ar: 'آخر ٧ أيام', en: 'Last 7 days' },
    pagesHeading:  { ar: 'الصفحات الأكثر زيارة', en: 'Top pages' },
    recentsHeading:{ ar: 'آخر الزيارات', en: 'Recent visits' },
    headers: {
      path:     { ar: 'المسار', en: 'Path' },
      when:     { ar: 'الوقت',  en: 'When' },
      duration: { ar: 'المدة',  en: 'Duration' },
      source:   { ar: 'المصدر', en: 'Source' },
      pages:    { ar: 'صفحات',  en: 'Pages' },
      device:   { ar: 'الجهاز', en: 'Device' },
      lang:     { ar: 'اللغة',  en: 'Lang' },
    },
    duration: {
      lessThanMin: { ar: 'أقل من دقيقة', en: '< 1 min' },
      minutes:     { ar: 'دقائق',       en: 'min' },
    },
  },
} as const

export default T

// Deep type-safe getter: T('home.hero.title1').ar
type Leaves<T> = T extends object
  ? { [K in keyof T]: Leaves<T[K]> }[keyof T] extends string
    ? T
    : never
  : never

export type TranslationLeaf = Leaves<typeof T>
