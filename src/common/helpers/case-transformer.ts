import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

interface ObjectValueType {
  [key: string]: unknown;
}

const caseTransformer = (transformKey: (key: string) => string) => {
  const transform = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(transform);

    if (typeof value === "object" && value) {
      const result: ObjectValueType = {};

      Object.keys(value).forEach((key) => {
        result[transformKey(key)] = transform((value as ObjectValueType)[key]);
      });

      return result;
    }

    return value;
  };

  return transform;
};

export const toCamelCase = caseTransformer(camelCase);

export const toSnakeCase = caseTransformer(snakeCase);
