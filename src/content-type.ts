import { ContentFields } from "contentful-management";
import { renderLinkType } from "./fields/render-link";
import { renderFieldType } from "./fields/render";

export interface IContentTypeFieldValidation {
  linkContentType?: string[];
  in?: (string | number)[];
}

export interface IContentTypeField {
  id: string;
  name: string;
  type: string;
  required: boolean;
}

export interface IContentType {
  id: string;
  name: string;
  description: string;
  fields: IContentTypeField[];
}

export function getInterfaceName(id: string): string {
  return 'I' + id[0].toUpperCase() + id.slice(1);
}

export class ContentType implements IContentType {
  id: string;
  name: string;
  description: string;
  fields: IContentTypeField[];

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.description = description;
    this.fields = [];
    this.name = name;
  }

  // {type: "Symbol"}
  // {type: "Text"}
  // {type: "RichText"}
  // {type: "Integer"}
  // {type: "Number"}
  // {type: "Date"}
  // {type: "Boolean"}
  // {type: "Location"}
  // {type: "Object"}
  // {type: "Link", linkType: "Asset"}
  // {type: "Link", linkType: "Entry"}
  // {type: "Array", items: {type: "Symbol"}}
  // {type: "Array", items: {type: "Link", linkType: "Entry"}}
  // {type: "Array", items: {type: "Link", linkType: "Asset"}}

  addField(field: ContentFields) {
    this.fields.push({
      id: field.id,
      name: field.name,
      type: renderFieldType(field),
      required: field.required,
    });
  }

  toString() {
    const interfaceName = getInterfaceName(this.id);
    let result = `export interface ${interfaceName} {\n`;
    this.fields.forEach(field => {
      result += `  ${field.id}${field.required ? '?' : ''}: ${field.type};\n`;
    });
    result += '}\n';
    return result;
  }
}
