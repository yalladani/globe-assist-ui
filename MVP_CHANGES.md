# MVP Changes - Global-e Agent

## שינויים עיקריים שבוצעו

### 1. מבנה נתונים חדש
- יצירת קובץ `src/data/topics.ts` עם מבנה היררכי של נושאים ותתי-נושאים
- כל קטגוריה מכילה נושאים ראשיים (Main Topics)
- כל נושא ראשי מכיל תתי-נושאים (Sub Topics) עם פרומטים מוכנים

### 2. זרימת עבודה חדשה

#### שלב 1: בחירת קטגוריה
- המשתמש בוחר קטגוריה (Shipments, Payments, Configuration)
- מוצגת רשימת הנושאים הראשיים של הקטגוריה

#### שלב 2: בחירת נושא ראשי
- המשתמש בוחר נושא ראשי (למשל: Shipment Delay)
- מוצגת רשימת תתי-הנושאים הרלוונטיים

#### שלב 3: בחירת תת-נושא או פרומפט מותאם
- המשתמש יכול לבחור מתתי-הנושאים המוכנים
- או לבחור "Ask a custom question" לפרומפט מותאם אישית

#### שלב 4: שיחה עם הסוכן
- המשתמש עובר לדף השיחה
- מוצג הנושא הנבחר בראש הפאנל
- המשתמש יכול לנהל שיחה פתוחה עם הסוכן בנושא הנבחר

### 3. קומפוננטות חדשות

#### `MainTopicsList.tsx`
- מציג את הנושאים הראשיים של קטגוריה
- עיצוב כרטיסים עם כותרות ותיאורים

#### `SubTopicsList.tsx`
- מציג את תתי-הנושאים של נושא ראשי
- כולל כפתור חזרה לנושאים הראשיים
- כולל אפשרות לפרומפט מותאם אישית

#### `CustomPromptInput.tsx`
- מאפשר למשתמש לכתוב פרומפט מותאם אישית
- כולל כפתור חזרה לתתי-הנושאים

#### `Footer.tsx`
- Footer פשוט ונקי עם מידע חיוני
- Copyright: © 2024 Global-e Agent. Powered by AI and Atlassian MCP
- אינדיקטור חיבור: Connected to Atlassian MCP עם נקודה ירוקה
- עיצוב רספונסיבי ומינימליסטי

### 4. עדכונים לקומפוננטות קיימות

#### `PromptInput.tsx`
- תמיכה במצבי תצוגה שונים (category, main-topics, sub-topics, custom-prompt)
- ניווט בין השלבים השונים
- העברת שם הנושא הנבחר

#### `ConversationPanel.tsx`
- **מבנה דביק**: Header קבוע למעלה, Input קבוע למטה, Messages גלילים באמצע
- הסרת תיבת הטקסט הקבועה
- הוספת תיבת טקסט דינמית לשיחה פתוחה
- תמיכה בפרומפטים מותאמים אישית
- הצגת הנושא הנבחר בראש הפאנל
- **UX משופר**: המשתמש תמיד רואה את תיבת הטקסט בתחתית

#### `HomeScreen.tsx`
- הוספת קומפוננטת Footer לדף הבית
- **הסרת רקע כתום**: הלוגו מוצג ללא רקע צבעוני

#### `Index.tsx`
- הוספת קומפוננטת Footer לדף השיחה
- **הסרת כפתור Component Gallery**: הגישה רק דרך URL `/gallery`

### 5. מבנה נתונים

```typescript
interface MainTopic {
  id: string;
  title: string;
  description: string;
  category: Category;
  subTopics: SubTopic[];
}

interface SubTopic {
  id: string;
  title: string;
  description: string;
  prompt: string;
}
```

### 6. דוגמאות לנושאים

#### Shipments Category
- **Shipment Delay**
  - Investigate Delay Cause
  - Notify Customer
  - Resolve Delay
  - Compensation Options

- **Tracking Update**
  - Update Tracking Info
  - Send Tracking Update
  - Troubleshoot Tracking

#### Payments Category
- **Payment Decline**
  - Investigate Decline
  - Resolve Decline
  - Alternative Payment

### 7. יתרונות הפתרון החדש

1. **ניווט אינטואיטיבי**: המשתמש מובל בשלבים ברורים
2. **גמישות**: אפשרות לפרומפטים מותאמים אישית
3. **שיחה פתוחה**: המשתמש יכול להמשיך לשאול שאלות
4. **הקשר ברור**: הנושא הנבחר מוצג לאורך כל השיחה
5. **מקורות מידע**: התשובות מבוססות על Atlassian MCP
6. **Footer נקי**: מידע חיוני בלבד ללא הסחות דעת
7. **UX משופר**: תיבת הטקסט דביקה לתחתית - תמיד נגישה
8. **ממשק נקי**: הסרת כפתורים מיותרים מדף הבית
9. **עיצוב מינימליסטי**: לוגו ללא רקע צבעוני

### 8. שימוש

1. המשתמש נכנס לאפליקציה
2. בוחר קטגוריה (למשל: Shipments)
3. בוחר נושא ראשי (למשל: Shipment Delay)
4. בוחר תת-נושא או כותב פרומפט מותאם
5. עובר לשיחה עם הסוכן
6. מנהל שיחה פתוחה בנושא הנבחר

### 9. Footer Features

הקומפוננטה Footer מציגה:

- **Copyright**: © 2024 Global-e Agent. Powered by AI and Atlassian MCP
- **Connection Status**: אינדיקטור חיבור ל-Atlassian MCP עם נקודה ירוקה
- **עיצוב מינימליסטי**: ללא הסחות דעת, מידע חיוני בלבד

### 10. Conversation Panel Layout

הקומפוננטה ConversationPanel כוללת:

- **Header קבוע**: כותרת ונושא נבחר - תמיד נראה
- **Messages גלילים**: אזור ההודעות עם גלילה חופשית
- **Input דביק**: תיבת הטקסט תמיד בתחתית - נגישה תמיד

### 11. Component Gallery Access

- **הסרת כפתור**: כפתור "🎨 View Component Gallery" הוסר מדף הבית
- **גישה דרך URL**: Component Gallery נגיש רק דרך `/gallery`
- **ממשק נקי**: דף הבית מתמקד בפונקציונליות העיקרית

### 12. Logo Design

- **הסרת רקע כתום**: הלוגו מוצג ללא רקע צבעוני
- **עיצוב נקי**: הלוגו בולט יותר על הרקע
- **מראה מקצועי**: עיצוב מינימליסטי ומודרני

הפתרון החדש מספק חוויית משתמש טובה יותר ומאפשר למשתמשים למצוא את המידע שהם מחפשים בצורה מהירה ויעילה. 