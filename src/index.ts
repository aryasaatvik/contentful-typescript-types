import { createClient } from "contentful-management";
import dotenv from "dotenv";
import fs from "fs";
import { ContentType } from "./content-type";

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
      contentType.addField(field);
    });
    return contentType;
  });

  let content = parsedContentTypes.map(contentType => contentType.toString()).join("\n");
  
  if (content.includes('Asset') || content.includes('Asset[]')) {
    const importAsset = `import { Asset } from "contentful-management";\n\n`;
    content = importAsset + content;
  }

  let filename = "src/contentful-types.d.ts";
  if (process.argv.length > 2) {
    filename = process.argv[2];
  }

  fs.writeFileSync(filename, content);
}

main();