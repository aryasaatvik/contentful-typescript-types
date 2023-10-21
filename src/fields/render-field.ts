import { ContentFields } from "contentful-management";
import { renderArrayType } from "./render-array";
import { renderLinkType } from "./render-link";

export function renderFieldType(field: ContentFields): string {
  switch (field.type) {
    case 'Symbol':
    case 'Text':    
    case 'RichText':
    case 'Date':
      return 'string';
    case 'Integer':
    case 'Number':
      return 'number';
    case 'Boolean':
      return 'boolean';
    case 'Location':
      return 'Record<string, number>'
    case 'Object':  
      return 'Record<string, any>'
    case 'Link':
      if (field.linkType && field.validations) {
        return renderLinkType(field.linkType, field.validations);
      }
      return 'any';
    case 'Array':
      if (!field.items) {
        console.warn(`Array field ${field.id} has no items`);
        return 'any[]';
      } else {
        return renderArrayType(field.items);
      }
    default:
      console.warn(`Unknown field type: ${field.type}`);
      return 'any';
  }
  
}