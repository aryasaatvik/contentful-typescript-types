export interface IContentTypeFieldValidation {
  linkContentType?: string[];
  in?: (string | number)[];
}

export interface IContentTypeField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  validations: IContentTypeFieldValidation[];
}

export interface IContentType {
  id: string;
  name: string;
  description: string;
  fields: IContentTypeField[];
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

  addField(field: IContentTypeField) {
    this.fields.push(field);
  }

  toString() {
    const interfaceName = 'I' + this.id[0].toUpperCase() + this.id.slice(1);
    let result = `export interface ${interfaceName} {\n`;
    this.fields.forEach(field => {
      result += `  ${field.id}: ${field.type};\n`;
    });
    result += '}\n';
    return result;
  }
}
