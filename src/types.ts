import type { Empty } from "./type-utils.ts";

export type PropertyObject =
  | PropertyObjectTitle
  | PropertyObjectRichText
  | PropertyObjectNumber
  | PropertyObjectSelect
  | PropertyObjectMultiSelect
  | PropertyObjectStatus
  | PropertyObjectDate
  | PropertyObjectPeople
  | PropertyObjectFiles
  | PropertyObjectCheckbox
  | PropertyObjectUrl
  | PropertyObjectEmail
  | PropertyObjectPhoneNumber
  | PropertyObjectFormula
  | PropertyObjectRelation
  | PropertyObjectRollup
  | PropertyObjectCreatedTime
  | PropertyObjectCreatedBy
  | PropertyObjectLastEditedTime
  | PropertyObjectLastEditedBy;

export type PropertyObjectTitle = PropertyObjectBase & {
  type: "title";
  title: Empty;
};

export type PropertyObjectRichText = PropertyObjectBase & {
  type: "rich_text";
  rich_text: Empty;
};

export type PropertyObjectNumber = PropertyObjectBase & {
  type: "number";
  format: NumberFormat;
};

export type PropertyObjectSelect = PropertyObjectBase & {
  type: "select";
  select: {
    options: SelectOption[];
  };
};

export type PropertyObjectMultiSelect = PropertyObjectBase & {
  type: "multi_select";
  multi_select: {
    options: SelectOption;
  };
};

// TODO
export type PropertyObjectStatus = PropertyObjectBase & {};

export type PropertyObjectDate = PropertyObjectBase & {
  type: "date";
  date: Empty;
};

export type PropertyObjectPeople = PropertyObjectBase & {
  type: "people";
  people: Empty;
};

export type PropertyObjectFiles = PropertyObjectBase & {
  type: "files";
  files: Empty;
};

export type PropertyObjectCheckbox = PropertyObjectBase & {
  type: "checkbox";
  checkbox: Empty;
};

export type PropertyObjectUrl = PropertyObjectBase & {
  type: "url";
  url: Empty;
};

export type PropertyObjectEmail = PropertyObjectBase & {
  type: "email";
  email: Empty;
};

export type PropertyObjectPhoneNumber = PropertyObjectBase & {
  type: "phone_number";
  phone_number: Empty;
};

export type PropertyObjectFormula = PropertyObjectBase & {
  type: "formula";
  formula: {
    expression: string;
  };
};

// TODO
export type PropertyObjectRelation = PropertyObjectBase & {};

export type PropertyObjectRollup = PropertyObjectBase & {
  type: "rollup";
  rollup: {
    rollup_property_name: string;
    relation_property_name: string;
    rollup_property_id: string;
    relation_property_id: string;
    function: RollupFunction;
  };
};

export type PropertyObjectCreatedTime = PropertyObjectBase & {
  type: "created_time";
  created_time: Empty;
};

export type PropertyObjectCreatedBy = PropertyObjectBase & {
  type: "created_by";
  created_by: Empty;
};

export type PropertyObjectLastEditedTime = PropertyObjectBase & {
  type: "last_edited_time";
  last_edited_time: Empty;
};

export type PropertyObjectLastEditedBy = PropertyObjectBase & {
  type: "last_edited_by";
  last_edited_by: Empty;
};

export type PropertyObjectBase = {
  id: string;
  name: string;
};

export type SelectOption = {
  id: string;
  name: string;
  color: Color;
};

/**
 * Database objects describe the property schema of a database in Notion.
 * Pages are the items (or children) in a database. Page property values must
 * conform to the property objects laid out in the parent database object.
 *
 * See documentation:
 * https://developers.notion.com/reference/database
 */
export type DatabaseObject = {
  /**
   * Always "database".
   */
  object: "database";

  /**
   * Unique identifier for the database.
   */
  id: string;

  /**
   * Date and time when this database was created.
   * Formatted as an ISO 8601 date time string.
   */
  created_time: string;

  /**
   * User who created the database.
   */
  created_by: PartialUser;

  /**
   * Date and time when this database was last updated.
   * Formatted as an ISO 8601 date time string.
   */
  last_edited_time: string;

  /**
   * User who last edited the database.
   */
  last_edited_by: PartialUser;

  /**
   * Name of the database as it appears in Notion.
   */
  title: RichText;

  /**
   * Description of the database as it appears in Notion.
   */
  description: RichText;

  /**
   * Page icon.
   */
  icon: FileObject | EmojiObject;

  /**
   * Page cover image.
   */
  cover: FileObjectExternal;

  /**
   * Schema of properties for the database as they appear in Notion,
   * where key is the name of the property as it appears in Notion, and
   * value is a `PropertyObject`.
   */
  properties: Record<string, PropertyObject>;

  /**
   * Information about the database's parent.
   */
  parent: ParentObject;

  /**
   * URL of the Notion database.
   */
  url: string;

  /**
   * Whether the database is archived.
   */
  archived: boolean;

  /**
   * `true` if the database appears in the page as an inline block,
   * `false` if the database appears as a child page.
   */
  is_inline: boolean;
};

export type RichText = RichTextObject[];

export type ParentObject =
  | DatabaseParent
  | PageParent
  | BlockParent
  | WorkspaceParent;

export type DatabaseParent = {
  type: "database_id";
  database_id: string;
};

export type PageParent = {
  type: "page_id";
  page_id: string;
};

export type BlockParent = {
  type: "block_id";
  block_id: string;
};

export type WorkspaceParent = {
  type: "workspace";
  workspace: true;
};

/**
 * Rich text objects contain the data that Notion uses to display formatted
 * text, mentions, and inline equations. Arrays of rich text objects within
 * database property objects and page property value objects are used to
 * create what a user experiences as a single text value in Notion.
 *
 * See documentation:
 * https://developers.notion.com/reference/rich-text
 */
export type RichTextObject =
  | RichTextTextObject
  | RichTextEquationObject
  | RichTextMentionObject;

/**
 * https://developers.notion.com/reference/rich-text#text
 */
export type RichTextTextObject = RichTextObjectBase & {
  type: "text";
  text: {
    /**
     * The actual text content of the text.
     */
    content: string;

    /**
     * An object with information about any inline link in this text, if any.
     */
    link?: { url: string };
  };
};

/**
 * https://developers.notion.com/reference/rich-text#equation
 */
export type RichTextEquationObject = RichTextObjectBase & {
  type: "equation";
  equation: {
    /**
     * The LaTeX string representing the inline equation.
     */
    expression: string;
  };
};

/**
 * https://developers.notion.com/reference/rich-text#mention
 */
export type RichTextMentionObject = RichTextObjectBase & {
  type: "mention";
  mention:
    | MentionDatabase
    | MentionDate
    | MentionLinkPreview
    | MentionPage
    | MentionTemplate
    | MentionUser;
};

/**
 * https://developers.notion.com/reference/rich-text#database-mention-type-object
 */
export type MentionDatabase = {
  type: "database";
  database: {
    id: string;
  };
};

/**
 * https://developers.notion.com/reference/rich-text#date-mention-type-object
 */
export type MentionDate = {
  type: "date";
  date: PropertyValueDate;
};

/**
 * https://developers.notion.com/reference/rich-text#link-preview-mention-type-object
 */
export type MentionLinkPreview = {
  type: "link_preview";
  link_preview: {
    url: string;
  };
};

/**
 * https://developers.notion.com/reference/rich-text#page-mention-type-object
 */
export type MentionPage = {
  type: "page";
  page: {
    id: string;
  };
};

/**
 * https://developers.notion.com/reference/rich-text#template-mention-type-object
 */
export type MentionTemplate = {
  type: "template_mention";
  template_mention: TemplateMentionDate | TemplateMentionUser;
};

export type TemplateMentionDate = {
  type: "template_mention_date";
  template_mention_date: "today" | "now";
};

export type TemplateMentionUser = {
  type: "template_mention_user";
  template_mention_user: "me";
};

/**
 * https://developers.notion.com/reference/rich-text#user-mention-type-object
 */
export type MentionUser = {
  type: "user";
  user: PartialUser; // TODO: is it partial?
};

export type RichTextObjectBase = {
  /**
   * The information used to style the rich text object.
   */
  annotations: AnnotationObject;

  /**
   * The plain text without annotations.
   */
  plain_text: string;

  /**
   * The URL of any link or Notion mention in this text, if any.
   */
  href?: string;
};

export type AnnotationObject = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: Color | BackgroundColor;
};

// Property values

/**
 * See documentation:
 * https://developers.notion.com/reference/property-value-object#date-property-values
 */
export type PropertyValueDate = {
  /**
   * An ISO 8601 format date, with optional time.
   */
  start: string;

  /**
   * An ISO 8601 formatted date, with optional time.
   * Represents the end of a date range.
   * If not specified, this date value is not a range.
   */
  end?: string;

  /**
   * Time zone information for start and end. Possible values are extracted
   * from the IANA database and they are based on the time zones from Moment.js.
   *
   * When time zone is provided, start and end should not have any UTC offset.
   * In addition, when time zone is provided, start and end must have time.
   *
   * If not specified, time zone information will be contained in UTC offsets
   * in start and end.
   */
  time_zone?: TimeZone;
};

export type EmojiObject = {
  /**
   * Always "emoji".
   */
  type: "emoji";

  /**
   * The emoji character.
   */
  emoji: string;
};

export type FileObject =
  | FileObjectFile
  | FileObjectExternal;

/**
 * https://developers.notion.com/reference/file-object#notion-hosted-files
 */
export type FileObjectFile = {
  type: "file";
  file: {
    /**
     * An authenticated S3 URL to the file.
     *
     * The URL is valid for one hour. If the link expires, then you can send
     * an API request to get an updated URL.
     */
    url: string;

    /**
     * The date and time when the link expires (ISO 8601).
     */
    expiry_time: string;
  };
};

export type FileObjectExternal = {
  type: "external";
  external: {
    /**
     * A link to the externally hosted content.
     */
    url: string;
  };
};

/* Other */

export type TimeZone = string;

export type PartialUser = {
  object: "user";
  id: string;
};

export type Color =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export type BackgroundColor =
  | "blue_background"
  | "brown_background"
  | "gray_background"
  | "green_background"
  | "orange_background"
  | "pink_background"
  | "purple_background"
  | "red_background"
  | "yellow_background";

export type NumberFormat =
  | "argentine_peso"
  | "baht"
  | "canadian_dollar"
  | "chilean_peso"
  | "colombian_peso"
  | "danish_krone"
  | "dirham"
  | "dollar"
  | "euro"
  | "forint"
  | "franc"
  | "hong_kong_dollar"
  | "koruna"
  | "krona"
  | "leu"
  | "lira"
  | "mexican_peso"
  | "new_taiwan_dollar"
  | "new_zealand_dollar"
  | "norwegian_krone"
  | "number"
  | "number_with_commas"
  | "percent"
  | "philippine_peso"
  | "pound"
  | "peruvian_sol"
  | "rand"
  | "real"
  | "ringgit"
  | "riyal"
  | "ruble"
  | "rupee"
  | "rupiah"
  | "shekel"
  | "singapore_dollar"
  | "uruguayan_peso"
  | "yen"
  | "yuan"
  | "won"
  | "zloty";

export type RollupFunction =
  | "average"
  | "checked"
  | "count_per_group"
  | "count"
  | "count_values"
  | "date_range"
  | "earliest_date"
  | "empty"
  | "latest_date"
  | "max"
  | "median"
  | "min"
  | "not_empty"
  | "percent_checked"
  | "percent_empty"
  | "percent_not_empty"
  | "percent_per_group"
  | "percent_unchecked"
  | "range"
  | "unchecked"
  | "unique"
  | "show_original"
  | "show_unique"
  | "sum";
