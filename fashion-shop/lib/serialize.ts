const NUMERIC_KEYS = new Set([
  "price",
  "total",
  "discount",
  "unitPrice",
  "quantity",
  "stock",
]);

export function serialize<T>(value: T): T {
  return deepSerialize(value) as T;
}

function isDecimal(value: unknown): value is { toNumber: () => number } {
  return (
    typeof value === "object" &&
    value !== null &&
    "toNumber" in value &&
    typeof (value as any).toNumber === "function"
  );
}

function deepSerialize(value: unknown, key?: string): unknown {
  if (isDecimal(value)) {
    return value.toNumber();
  }

  if (
    key &&
    NUMERIC_KEYS.has(key) &&
    typeof value === "string" &&
    value !== "" &&
    !Number.isNaN(Number(value))
  ) {
    return Number(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map((v) => deepSerialize(v, key));
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entry]) => [
        entryKey,
        deepSerialize(entry, entryKey),
      ]),
    );
  }

  return value;
}
