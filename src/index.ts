import { createClient } from "contentful-management";
import dotenv from "dotenv";
import fs from "fs";
import { ContentType, IContentTypeField, IContentTypeFieldValidation } from "./content-type";

async function main() {
  dotenv.config(); 
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("CONTENTFUL_MANAGEMENT_ACCESS_TOKEN is not defined");
  }
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  if (!spaceId) {
    throw new Error("CONTENTFUL_SPACE_ID is not defined");
  }
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;
  if (!environmentId) {
    throw new Error("CONTENTFUL_ENVIRONMENT_ID is not defined");
  }

  const client = createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);
  const contentTypes = await environment.getContentTypes();

  const parsedContentTypes = contentTypes.items.map(item => {
    const contentType = new ContentType(item.sys.id, item.name, item.description);
    item.fields.map(field => {
      const validations = field.validations?.map(validation => {
        const { linkContentType, in: inValues } = validation;
        const result: IContentTypeFieldValidation = {};
        if (linkContentType) {
          result.linkContentType = linkContentType;
        }
        if (inValues) {
          result.in = inValues;
        }
        return result;
      });
      const contentTypeField: IContentTypeField = {
        id: field.id,
        name: field.name,
        type: field.type,
        required: field.required,
        validations: validations || [],
      };
      contentType.addField(contentTypeField);
    });
    return contentType;
  });
  const content = parsedContentTypes.map(contentType => contentType.toString()).join("\n");
  fs.writeFileSync("src/contentful-types.d.ts", content);
}

main();