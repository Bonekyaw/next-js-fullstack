## Fashion App Database Design

This schema is a **fashion shop + Better Auth** database on PostgreSQL.

Two groups of models:

1. **Auth** — `User`, `Session`, `Account`, `Verification` (login/signup)
2. **Shop** — `Product`, `ProductVariant`, `CartItem`, `Favorite`, `Order`, `OrderItem`

`@@map("...")` sets the real SQL table name (e.g. model `User` → table `user`).

---

## Relation syntax

```prisma
userId  String
user    User  @relation(fields: [userId], references: [id], onDelete: Cascade)
```

| Piece               | Meaning                                               |
| ------------------- | ----------------------------------------------------- |
| `userId`            | Foreign key column (stores the other row’s id)        |
| `user User`         | Prisma relation field (for `include` / nested writes) |
| `fields: [userId]`  | “This side holds the FK”                              |
| `references: [id]`  | Points at `User.id`                                   |
| `onDelete: Cascade` | Delete parent → delete these children too             |

The **other** side usually has an array: `sessions Session[]` (“one user, many sessions”).

---

## Enums (fixed allowed values)

| Enum            | Values                         | Used for                      |
| --------------- | ------------------------------ | ----------------------------- |
| `Category`      | MEN, WOMEN, TEENS, CHILD, KIDS | Product category filter       |
| `OrderStatus`   | PENDING → … → CANCELLED        | Order lifecycle               |
| `PaymentMethod` | COD                            | Cash on delivery only for now |

---

## Auth models

### `User`

A shopper (or admin via `role`).

Important fields: `email` (unique), `emailVerified`, `role` (default `"USER"`), `isFrozen`, optional `image`.

Owns (one-to-many):

- `sessions` → login sessions
- `accounts` → password / Google credentials
- `cartItems`, `favorites`, `orders` → shopping data

### `Session`

“This browser is logged in as this user until `expiresAt`.”

- Many sessions → one `User` (`userId`)
- Unique `token` (cookie value)
- `onDelete: Cascade` — delete user → wipe sessions

### `Account`

How the user authenticates (email/password hash, Google OAuth tokens, etc.).

- Many accounts → one `User`
- `providerId` = `"credential"` / `"google"`, etc.
- `password` optional (only for email/password)

### `Verification`

OTP / email verification codes (Better Auth). **No relation to User** — keyed by `identifier` (usually email) + `value` + `expiresAt`.

---

## Shop catalog

### `Product`

The style (e.g. “Blue Hoodie”), not a specific size/color.

- `slug` unique (URL: `/products/blue-hoodie`)
- `price`, `category`, `imageUrl`, `isActive`
- Has many `variants` and `favorites`

### `ProductVariant`

A sellable SKU: **size + color + stock** for one product.

```prisma
@@unique([productId, size, color])
```

So one product can’t have two “M / Black” rows.

- Belongs to one `Product` (`productId`, cascade delete)
- Appears in many `cartItems` and `orderItems`

**Teaching idea:** Cart/orders point at **variants**, favorites at **products**.

---

## Shopping behavior

### `CartItem`

“User X wants quantity N of variant Y.”

```
User 1 ──< CartItem >── 1 ProductVariant
```

- `@@unique([userId, variantId])` — one line per variant per user (update qty, don’t duplicate)
- Cascade if user or variant is deleted

### `Favorite`

Wishlist on the **product** (not a specific size).

```
User 1 ──< Favorite >── 1 Product
@@unique([userId, productId])
```

Same pattern: one favorite per product per user.

### `Order`

A placed checkout: address, phone, `total`, `status`, `paymentMethod` (COD).

- Belongs to one `User`
- Has many `OrderItem`s

### `OrderItem`

A line on an order. Stores **snapshot** fields (`productName`, `size`, `color`, `unitPrice`) so history stays correct if the catalog changes later.

- Belongs to one `Order` (cascade with order)
- Points at `ProductVariant` (**no** cascade on variant delete — keeps order history)

---

## Relation map (draw this)

```
User
 ├── Session[]          (auth cookies)
 ├── Account[]          (login providers)
 ├── CartItem[] ──────► ProductVariant ──► Product
 ├── Favorite[] ──────► Product
 └── Order[]
      └── OrderItem[] ► ProductVariant ──► Product

Verification          (standalone OTP rows)
```

Cardinality cheat sheet:

| Relation                             | Type                     |
| ------------------------------------ | ------------------------ |
| User ↔ Session                       | 1 : many                 |
| User ↔ Account                       | 1 : many                 |
| User ↔ CartItem                      | 1 : many                 |
| User ↔ Favorite                      | 1 : many                 |
| User ↔ Order                         | 1 : many                 |
| Product ↔ ProductVariant             | 1 : many                 |
| Product ↔ Favorite                   | 1 : many                 |
| ProductVariant ↔ CartItem            | 1 : many                 |
| ProductVariant ↔ OrderItem           | 1 : many                 |
| Order ↔ OrderItem                    | 1 : many                 |
| User ↔ Product (via Favorite)        | many : many (join table) |
| User ↔ ProductVariant (via CartItem) | many : many (join table) |

`Favorite` and `CartItem` are the **join tables** for those many-to-many links, with extra data (`createdAt`, `quantity`).

---

## Classroom one-liners

- **User** = who is shopping / signing in
- **Session / Account / Verification** = how auth works
- **Product** = catalog item; **ProductVariant** = size/color you buy
- **CartItem / Favorite** = current shopping intent
- **Order / OrderItem** = frozen purchase history

**Cascade rule of thumb:** deleting a user clears their cart/favorites/orders/sessions; deleting a product clears its variants and favorites; order lines stay tied carefully so history isn’t casually wiped when a variant disappears.
