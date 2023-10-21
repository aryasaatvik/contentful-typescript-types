import { ContentFields, ContentTypeFieldValidation } from "contentful-management";
import { getInterfaceName } from "../content-type";

export function renderLinkType(linkType: string, validations: ContentTypeFieldValidation[]): string {
  if (linkType === 'Asset') {
    return 'Asset';
  }
  if (linkType === 'Entry') {
    if (validations) {
      const validation = validations.find(validation => validation.linkContentType);
      if (validation?.linkContentType) {
        return validation.linkContentType.map((linkContentType: string) => getInterfaceName(linkContentType)).join(' | ');
      }
    }
  }
  return 'any';
}
