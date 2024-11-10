import { businessExceptionFactory } from "#/src/utils/business-exception-factory";

interface Props {
  swaggerAsJson: Record<string, unknown>;
  $ref: string;
}

const GetDefaultRequestBodyException = businessExceptionFactory(
  "GetDefaultRequestBodyException"
);

export function getDefaultRequestBody(input: Props) {
  const ref = input.$ref.split("/").pop();
  const swaggerJson = input.swaggerAsJson;

  // Extract the schema from the swagger JSON using the $ref value
  const schema = swaggerJson.components.schemas[ref];
  if (!schema) throw new GetDefaultRequestBodyException("Schema is empty");

  // Helper function to populate the defaults
  function populateDefaults(schemaDefinition: Props) {
    const result = {};

    if (schemaDefinition.properties) {
      for (const [key, property] of Object.entries(
        schemaDefinition.properties
      )) {
        if (property.default !== undefined) {
          result[key] = property.default;
        } else if (property.$ref) {
          // Resolve nested $ref references
          const refName = property.$ref.split("/").pop();
          const nestedSchema = swaggerJson.components.schemas[refName];
          result[key] = populateDefaults(nestedSchema);
        }
      }
    }

    return result;
  }

  // Generate the output based on the defaults in the schema
  return populateDefaults(schema);
}
