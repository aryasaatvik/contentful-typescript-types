import { ContentTypeFieldValidation } from "contentful-management";
import { renderFieldType } from "./render-field";
import { getInterfaceName } from "../content-type";

interface Item {
  type: string;
  linkType?: string;
  validations?: ContentTypeFieldValidation[];
}

export function renderArrayType(item: Item): string {
  const validations = item.validations;
  if (item.type === 'Link') {
    if (item.linkType === 'Asset') {
      return 'Asset[]';
    }
    if (item.linkType === 'Entry') {
      if (validations) {
        const validation = validations.find(validation => validation.linkContentType);
        if (validation?.linkContentType) {
          return validation.linkContentType.map((linkContentType: string) => getInterfaceName(linkContentType)).join(' | ') + '[]';
        }
      }
    }
  }
  if (item.type === 'Symbol') {
    if (validations) {
      const validation = validations.find(validation => validation.in);
      if (validation?.in) {
        return validation.in.map((value: string | number) => `'${value}'`).join(' | ') + '[]';
      }
    }
  }
  return 'any[]';
}