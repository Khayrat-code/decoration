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
    howWeWork:   { ar: 'كيف نعمل',     en: 'How we work' },
    contact:     { ar: 'تواصل',        en: 'Contact' },
    complaints:  { ar: 'الشكاوى والاقتراحات', en: 'Complaints' },
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
    mawthoogSub:  { ar: 'موثوق · Mawthoog', en: 'Verified · Mawthoog' },
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
      tabby:      { ar: 'تابي', en: 'Tabby' },
      tamara:     { ar: 'تمارا', en: 'Tamara' },
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
      // 3 inline service tags rendered under the hero description, with a
      // gold dot before each label. Pattern borrowed from zarva.sa —
      // labels are pulled verbatim from the existing services items so we
      // do not invent new marketing copy.
      tags: [
        { ar: 'التصميم الداخلي',        en: 'Interior Design'    },
        { ar: 'الديكور المنزلي',        en: 'Home Décor'         },
        { ar: 'معاينة ثلاثية الأبعاد',  en: '3D Visualization'   },
      ],
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
      eyebrow:  { ar: 'تصميم يناسب مشروعك',  en: 'Design for your project' },
      title:    { ar: 'مساحة بهوية تُرى وتُذكر', en: 'A space with an identity — seen and remembered' },
      tagline:  { ar: 'من الفكرة إلى التنفيذ، نصنع الفرق', en: 'From idea to execution, we make the difference' },
      body: {
        ar: 'حلول متكاملة في الأثاث والديكور والتجهيز الداخلي للمكاتب، الفنادق، والمساحات التجارية، بتنفيذ يواكب هوية كل مشروع.',
        en: 'Integrated solutions in furniture, décor, and interior fit-out for offices, hotels, and commercial spaces — delivered with the identity of every project in mind.',
      },
      button:   { ar: 'لنصنع مشروعك معًا', en: 'Let’s build your project' },
    },
  },

  /* ------------------ How We Work page ------------------ */
  howWeWork: {
    eyebrow:   { ar: 'كيف نعمل', en: 'How we work' },
    title:     { ar: 'عملية منضبطة، تنفيذ متأنٍّ.', en: 'A disciplined process, a careful delivery.' },
    intro: {
      ar: 'كل مشروع يمر بأربع مراحل متتابعة، عادةً على مدى أسابيع إلى أشهر. لا نختصر أي مرحلة، لأن الجودة لا تأتي من السرعة.',
      en: 'Every project passes through four consecutive stages, typically over weeks to months. We never short-cut any stage — quality never comes from speed alone.',
    },
    principlesEyebrow: { ar: 'مبادئنا',   en: 'Our principles' },
    principles: [
      {
        title: { ar: 'الإصغاء قبل التصميم', en: 'Listen before drawing' },
        body:  {
          ar: 'نبدأ من المساحة وكيف تُستخدم فعلاً، لا من صور جاهزة. الفكرة تأتي بعد فهم الموقع واحتياجات العميل.',
          en: 'We start with the space and how it is actually used — not from a mood-board. The concept follows the site and the client’s needs.',
        },
      },
      {
        title: { ar: 'مواد تَعِيش', en: 'Materials that age well' },
        body:  {
          ar: 'نختار الخشب، الحجر، الكتان، والجبس لما يضيفونه للغرفة بعد سنة، لا لما يبدونه في أول صورة.',
          en: 'We choose wood, stone, linen, and plaster for what they add to a room after a year — not for how they look in the first photograph.',
        },
      },
      {
        title: { ar: 'عدد قليل من المشاريع', en: 'A few projects at a time' },
        body:  {
          ar: 'نرفض أكثر مما نقبل. المشروع الذي يستحق الاهتمام الكامل هو مشروعٌ واحدٌ فقط، لا عدة مشاريع.',
          en: 'We turn down more than we take on. A project worth full attention is one project, not several.',
        },
      },
      {
        title: { ar: 'شفافية كاملة', en: 'Full transparency' },
        body:  {
          ar: 'ميزانية واضحة، جدول زمني معتمد، وتحديثات منتظمة. لا مفاجآت في الفاتورة النهائية.',
          en: 'A clear budget, an agreed timeline, and regular updates. No surprises in the final invoice.',
        },
      },
    ],
    timelineEyebrow: { ar: 'المراحل', en: 'Stages' },
    timelineNote:    { ar: 'المدة تقريبية وتختلف بحسب حجم وتعقيد المشروع.', en: 'Duration is approximate and varies with project size and complexity.' },
    discussCta:      { ar: 'ناقش مشروعك معنا', en: 'Discuss your project' },
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
    title:   { ar: 'لنصنع مشروعك معًا.', en: 'Let’s build your project together.' },
    body: {
      ar: 'أرسل لنا بعض الصور، أبعاد المساحة، وما يتخيله ذهنك. يقرأ فريقنا كل رسالة، ويُردّ خلال خمسة أيام عمل.',
      en: 'Send us a few photos, the dimensions of the space, and what you have in mind. Our team reads every message and replies within five working days.',
    },
    form: {
      name:    { ar: 'الاسم الكامل',    en: 'Full name' },
      email:   { ar: 'البريد الإلكتروني', en: 'Email' },
      phone:   { ar: 'الهاتف',   en: 'Phone' },
      phoneOptional: { ar: 'اختياري', en: 'optional' },
      projectType: { ar: 'نوع المشروع', en: 'Project type' },
      projectTypePh: { ar: 'منزل · مكتب · فندق · مطعم · حديقة · مساحة تجارية', en: 'Home · Office · Hotel · Restaurant · Garden · Commercial' },
      spaceSize: { ar: 'مساحة المشروع (م²)', en: 'Project size (m²)' },
      spaceSizePh: { ar: 'مثال: ١٢٠', en: 'e.g. 120' },
      message: { ar: 'تفاصيل المشروع',  en: 'Project details' },
      messagePh: {
        ar: 'أخبرنا عن المساحة، ما تستخدمه لها، والأجواء التي تتخيلها.',
        en: 'Tell us about the space, how you use it, and the atmosphere you have in mind.',
      },
      submit:  { ar: 'إرسال الطلب', en: 'Send request' },
      submitting: { ar: 'جاري الإرسال…', en: 'Sending…' },
      sendAnother: { ar: 'إرسال رسالة أخرى', en: 'Send another request' },
      success: {
        title: { ar: 'تم استلام طلبك.',  en: 'Request received.' },
        body:  { ar: 'سنعود إليك خلال خمسة أيام عمل بخطواتنا التالية.', en: 'We’ll get back to you within five working days with our next steps.' },
      },
      errors: {
        required: { ar: 'يرجى تعبئة الاسم والبريد الإلكتروني وتفاصيل المشروع.', en: 'Please fill in name, email, and project details.' },
        email:    { ar: 'صيغة البريد الإلكتروني غير صحيحة.', en: 'That email doesn’t look quite right.' },
      },
    },
    aside: {
      studio: {
        label:  { ar: 'الاستوديو',  en: 'The studio' },
        title:  { ar: 'تولكان للديكور', en: 'ToolCan Decoration' },
        detail: { ar: 'نعمل على عدد قليل من المشاريع في كل مرة.', en: 'We take on a small number of projects at a time.' },
      },
      reach: {
        label:  { ar: 'كيف تصل إلينا', en: 'How to reach us' },
        title:  { ar: 'واتساب · البريد · الهاتف', en: 'WhatsApp · Email · Phone' },
        detail: { ar: 'متاحون من الإثنين إلى الجمعة، ١٠–١٨.', en: 'Available Monday to Friday, 10–18.' },
      },
      areas: {
        label:  { ar: 'نخدم', en: 'We serve' },
        title:  { ar: 'الرياض · المملكة العربية السعودية', en: 'Riyadh · Saudi Arabia' },
        detail: { ar: 'مشاريع مختارة داخل المملكة وخارجها.', en: 'Selected projects across the Kingdom and beyond.' },
      },
    },
  },

  /* ------------------ Complaints & Suggestions page ------------------ */
  complaints: {
    eyebrow: { ar: 'الشكاوى والاقتراحات', en: 'Complaints & suggestions' },
    title:   { ar: 'رأيك يصنع فرقًا.', en: 'Your opinion makes a difference.' },
    body: {
      ar: 'نحرص على تحسين تجربتك باستمرار. أرسل ملاحظتك بصراحة، وسنردّ عليك خلال أيام عمل قليلة.',
      en: 'We are committed to improving our work continuously. Send your feedback honestly — we’ll reply within a few working days.',
    },
    form: {
      name:        { ar: 'الاسم',    en: 'Name' },
      email:       { ar: 'البريد الإلكتروني', en: 'Email' },
      phone:       { ar: 'الهاتف',   en: 'Phone' },
      phoneOptional: { ar: 'اختياري', en: 'optional' },
      type:        { ar: 'نوع الرسالة', en: 'Message type' },
      typeComplaint: { ar: 'شكوى', en: 'Complaint' },
      typeSuggestion: { ar: 'اقتراح', en: 'Suggestion' },
      typeAppreciation: { ar: 'شكر وتقدير', en: 'Appreciation' },
      orderRef:    { ar: 'رقم الطلب / المشروع (اختياري)', en: 'Order / project reference (optional)' },
      message:     { ar: 'تفاصيل الرسالة',  en: 'Message details' },
      messagePh: {
        ar: 'اشرح ملاحظتك بوضوح، مع أي تفاصيل تساعدنا على المتابعة.',
        en: 'Explain your feedback clearly, with any details that help us follow up.',
      },
      submit:      { ar: 'إرسال الرسالة', en: 'Submit' },
      submitting:  { ar: 'جاري الإرسال…', en: 'Submitting…' },
      sendAnother: { ar: 'إرسال رسالة أخرى', en: 'Send another' },
      success: {
        title: { ar: 'شكرًا لوقتك.',  en: 'Thank you for your time.' },
        body:  { ar: 'وصلتنا رسالتك. فريق المتابعة سيتواصل معك قريبًا.', en: 'We’ve received your message. Our team will be in touch soon.' },
      },
      errors: {
        required: { ar: 'يرجى تعبئة الاسم والبريد الإلكتروني والتفاصيل.', en: 'Please fill in name, email, and details.' },
        email:    { ar: 'صيغة البريد الإلكتروني غير صحيحة.', en: 'That email doesn’t look quite right.' },
      },
    },
    promise: {
      title: { ar: 'ما نعدك به', en: 'Our promise' },
      items: [
        {
          ar: 'نقرأ كل رسالة يدويًا، ونتعامل معها بسرّية تامة.',
          en: 'We read every message manually and treat it with full confidentiality.',
        },
        {
          ar: 'نردّ خلال خمسة أيام عمل مع الخطوات التالية.',
          en: 'We reply within five working days with our next steps.',
        },
        {
          ar: 'نوثّق الملاحظات ونتشاركها مع فريق العمل للتحسين.',
          en: 'We document feedback and share it with the team for improvement.',
        },
      ],
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
    eyebrow:  { ar: 'من نحن', en: 'About' },
    title:    { ar: 'من نحن', en: 'About us' },
    body1: {
      ar: 'شركة متخصصة في بناء هوية لمساحات متكاملة: منازل، مكاتب، فنادق، مطاعم، حدائق، ومساحات تجارية.',
      en: 'A studio specialised in building identity for complete spaces — homes, offices, hotels, restaurants, gardens, and commercial venues.',
    },
    body2: {
      ar: 'من خلال تصميم وتنسيق مدروس، واختيار دقيق للمواد والأثاث، وتنفيذ يُترجم الفخامة إلى واقع ملموس.',
      en: 'Through considered design, careful selection of materials and furniture, and execution that turns luxury into a tangible reality.',
    },
    body3: {
      ar: 'نؤمن أن لكل مساحة شخصية… ومهمتنا أن نكشفها بأعلى درجات الدقة والتميّز.',
      en: 'We believe every space has a personality — our job is to reveal it with the highest precision and distinction.',
    },
    body4: {
      ar: 'نخلق مساحات تحمل توقيعها الخاص: واضحة، واثقة، ولا تُشبه سواها.',
      en: 'We create spaces that carry their own signature — clear, confident, and unlike anything else.',
    },
    body5: {
      ar: 'نجمع بين الإبداع والخبرة، بواسطة نخبة من المصممين المحترفين، لتقديم حلول تصميمية متكاملة تشمل التصميم الداخلي، اختيار الأثاث، وتنسيق الديكورات بأعلى معايير الجودة والفخامة.',
      en: 'We combine creativity with expertise — through a team of professional designers — to deliver integrated design solutions that include interior design, furniture selection, and décor styling at the highest standards of quality and luxury.',
    },
    signatureEyebrow: { ar: 'توقيعنا', en: 'Our signature' },
    signature: {
      ar: 'كل مساحة نُسلّمها تحمل بصمتنا: لمسة هادئة، تفاصيل متقنة، وهوية واضحة.',
      en: 'Every space we hand over carries our signature: a quiet touch, refined details, and a clear identity.',
    },
    valuesEyebrow: { ar: 'قيمنا', en: 'Our values' },
    values: [
      {
        title: { ar: 'هوية واضحة لكل مساحة', en: 'A clear identity for every space' },
        body:  {
          ar: 'لا نكرّر القوالب الجاهزة. كل مشروع يُرسم من الصفر ليُعبّر عن صاحبه والمكان الذي يحتضنه.',
          en: 'We never repeat ready-made templates. Every project is drawn from scratch to reflect its owner and its place.',
        },
      },
      {
        title: { ar: 'اختيار دقيق للمواد', en: 'Carefully chosen materials' },
        body:  {
          ar: 'نختار الخشب، الحجر، النسيج، والمعدن من مصادر موثوقة، بمعايير جودة صارمة ومتانة طويلة المدى.',
          en: 'We source wood, stone, fabric, and metal from trusted suppliers with strict quality and durability standards.',
        },
      },
      {
        title: { ar: 'فخامة هادئة', en: 'Quiet luxury' },
          body: {
          ar: 'نُحقّق الفخامة من خلال الجودة والتوازن، لا من خلال البذخ. الرقي في التفاصيل، لا في الصخب.',
          en: 'We achieve luxury through quality and balance — not through excess. Refinement lives in the details, not in the noise.',
        },
      },
      {
        title: { ar: 'تنفيذ منضبط', en: 'Disciplined execution' },
        body:  {
          ar: 'خطة واضحة، جدول زمني معتمد، وفريق متابعة يضمن التسليم بالجودة المتفق عليها.',
          en: 'A clear plan, an agreed timeline, and a supervision team that ensures delivery at the agreed quality.',
        },
      },
    ],
  },

  /* ------------------ Policies page ------------------ */
  policies: {
    eyebrow: { ar: 'السياسات', en: 'Policies' },
    title:   { ar: 'سياساتنا ومبادئنا في العمل.', en: 'Our policies and working principles.' },
    intro:   {
      ar: 'نلتزم بمجموعة واضحة من السياسات التي تحمي بياناتك، وتضمن جودة عملنا، وتوضح حقوقك. لأي استفسار، راسلنا على البريد أدناه.',
      en: 'We follow a clear set of policies that protect your data, guarantee our work, and clarify your rights. For any question, write to the email below.',
    },
    lastUpdated: { ar: 'آخر تحديث', en: 'Last updated' },
    privacy: {
      title: { ar: 'الخصوصية', en: 'Privacy' },
      body: {
        ar: 'نجمع فقط ما نحتاجه: رسائلك عبر النموذج، وملفات الصور التي ترفعها عند الدخول إلى لوحة الإدارة. لا نبيع بياناتك، ولا نشاركها مع أي طرف ثالث. يمكنك طلب تعديلها أو حذفها في أي وقت عبر البريد الإلكتروني.',
        en: 'We only collect what we need: the messages you send through the contact form, and the images you upload when signed in to the admin dashboard. We do not sell your data, and we do not share it with any third party. You can ask us to amend or delete it at any time by email.',
      },
    },
    cookies: {
      title: { ar: 'ملفات تعريف الارتباط', en: 'Cookies & local storage' },
      body: {
        ar: 'نستخدم التخزين المحلي في متصفحك لحفظ اختيار اللغة، وحفظ جلسة تسجيل الدخول للإدارة. لا نضع أي ملفّات تتبّع، ولا نستخدم أي إعلانات موجّهة.',
        en: 'We use your browser’s local storage to remember your language choice and to keep you signed in to the admin area. We do not place any tracking cookies, and we do not run targeted advertising.',
      },
    },
    analytics: {
      title: { ar: 'إحصائيات الزوار', en: 'Visitor analytics' },
      body: {
        ar: 'نسجّل زيارات مجهولة الهوية (الصفحات التي شُوهدت، ومدة البقاء التقريبية، والجهاز) لتحسين تجربة الموقع. البيانات لا تحتوي على اسمك أو بريدك، ولا تُربط بهويتك.',
        en: 'We record anonymous visits (pages seen, approximate time on site, and device) to improve the experience. The data contains no name or email, and is not tied to your identity.',
      },
    },
    images: {
      title: { ar: 'حقوق الصور والمحتوى', en: 'Image and content rights' },
      body: {
        ar: 'جميع الصور والمحتوى البصري في هذا الموقع من أعمال الاستوديو، أو مأذونٌ باستخدامها من أصحابها كتابةً. لا يحق لأي طرف نسخها أو إعادة استخدامها دون إذن كتابي مسبق.',
        en: 'All photographs and visual content in this site are our own work, or used with the owner’s written permission. No one may copy or reuse them without our prior written consent.',
      },
    },
    terms: {
      title: { ar: 'شروط الاستخدام', en: 'Terms of use' },
      body: {
        ar: 'باستخدامك لهذا الموقع فإنك توافق على عدم محاولة الوصول غير المصرّح به إلى أنظمتنا، وعدم استنساخ المحتوى لأغراض تجارية. المحتوى مقدّم كما هو، دون أي ضمانات صريحة.',
        en: 'By using this site you agree not to attempt unauthorised access to our systems, and not to reproduce the content for commercial purposes. The content is provided as-is, without any express warranties.',
      },
    },
    delivery: {
      title: { ar: 'التسليم والجودة', en: 'Delivery & quality' },
      body: {
        ar: 'نتقيّد بالجدول الزمني والميزانية المتفق عليهما في عقد المشروع. أي ملاحظة على جودة التنفيذ تُبلَّغ خلال ١٤ يومًا من التسليم، ونعمل على معالجتها في أسرع وقت ممكن.',
        en: 'We adhere to the timeline and budget agreed in the project contract. Any remark on the execution quality must be raised within 14 days of hand-over, and we will address it as soon as possible.',
      },
    },
    contact: {
      title: { ar: 'تواصل', en: 'Get in touch' },
      body: {
        ar: 'لأي استفسار يخص الخصوصية، الصور، أو شروط الاستخدام، راسلنا على khayratum@gmail.com.',
        en: 'For any question about privacy, image rights, or terms of use, write to khayratum@gmail.com.',
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
