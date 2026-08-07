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
  { key: 'Bathroom', ar: 'حمامات',     en: 'Bathroom' },
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
      email:        { ar: 'hello@toolcan.example',     en: 'hello@toolcan.example' },
    },
    connect: {
      instagram: { ar: 'إنستغرام', en: 'Instagram' },
      pinterest: { ar: 'بنترست',   en: 'Pinterest' },
      admin:     { ar: 'دخول الاستوديو', en: 'Studio admin' },
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
    categories: {
      eyebrow: { ar: 'الغرف',       en: 'Rooms' },
      title:   { ar: 'أنواع المساحات التي نصوغها', en: 'The kinds of spaces we shape' },
      cta:     { ar: 'اطّلع على المعرض كاملاً',  en: 'See all in the gallery' },
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
        title:  { ar: 'hello@toolcan.example', en: 'hello@toolcan.example' },
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
} as const

export default T

// Deep type-safe getter: T('home.hero.title1').ar
type Leaves<T> = T extends object
  ? { [K in keyof T]: Leaves<T[K]> }[keyof T] extends string
    ? T
    : never
  : never

export type TranslationLeaf = Leaves<typeof T>
