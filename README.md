# @elay-io/adminjs-relation

> React 18 compatible fork of [@hero-truong/adminjs-relation](https://github.com/hero-truong/adminjs-relation-hero) — Advanced relation management feature for AdminJS.

## Why This Fork?

The original `@hero-truong/adminjs-relation` package requires React 19, but AdminJS currently uses React 18. This fork updates the peer dependencies to be compatible with React 18 while maintaining all the original functionality.

**Changes from original:**
- Updated `react` peer dependency from `^19.1.0` to `^18.2.0`
- Updated `react-dom` peer dependency from `^19.1.0` to `^18.2.0`
- Updated `react-redux` peer dependency to support both `^8.1.0` and `^9.0.0`
- Updated dev dependencies (`@types/react`, `@types/react-dom`) to React 18 versions

## 📖 Introduction

`@elay-io/adminjs-relation` is an enhanced relations plugin for [AdminJS](https://adminjs.co/) which helps you easily manage both **one-to-many** and **many-to-many** relationships inside AdminJS resources.

It is heavily inspired by `@adminjs/relations` but with improved TypeScript support, easier configuration, and a simple license system that allows you to use it freely.

You can fully use this package for personal or commercial projects. The license key is optional.

---

## ✨ Features

- ✅ Full AdminJS relation support (One-to-Many, Many-to-Many)  
- ✅ Works seamlessly with AdminJS 7.x+  
- ✅ Easy to configure via clean relation definitions  
- ✅ Fully written in TypeScript  
- ✅ Support for advanced UI components to manage relations  
- ✅ Optional license key system (soft-license)  
- ✅ Built-in instruction message for free users  
- ✅ Actively maintained  

---

## 🚀 Installation

Using **NPM** (from GitHub):

```bash
npm install github:elay-io/adminjs-relation
```

Using **Yarn**:

```bash
yarn add github:elay-io/adminjs-relation
```

Using **PNPM**:

```bash
pnpm add github:elay-io/adminjs-relation
```

---

## 🛠 Basic Usage

### 1️⃣ Define Relations Configuration

Define your relations using the `RelationsFeatureOptions` type:

```ts
import {
  RelationsFeatureOptions,
  owningRelationSettingsFeature,
  targetRelationSettingsFeature,
} from '@elay-io/adminjs-relation';

// 1️⃣ Define your relation configs
const relations: RelationsFeatureOptions['relations'] = {
  // One Post has many Comments
  comments: {
    type: 'one-to-many',
    target: {
      resourceId: 'Comment',
      // Comment.ownerPostId → Post.id
      foreignKey: 'ownerPostId',
    },
  },
  // Posts and Tags are many-to-many via PostTag
  tags: {
    type: 'many-to-many',
    junction: {
      throughResourceId: 'PostTag', // the join table
      joinKey: 'postId',            // PostTag.postId → Post.id
      inverseJoinKey: 'tagId',      // PostTag.tagId  → Tag.id
    },
    target: {
      resourceId: 'Tag',
    },
  },
};

// 2️⃣ Apply the owning side feature on the Post resource
export const createPostResource = (componentLoader) => ({
  resource: PostModel,
  features: [
    owningRelationSettingsFeature({
      componentLoader,
      relations,
      // licenseKey: 'YOUR_LICENSE_KEY', // optional
    }),
  ],
});

// 3️⃣ (Optional) Apply the reverse/target feature on Comment and Tag
export const createCommentResource = (componentLoader) => ({
  resource: CommentModel,
  features: [targetRelationSettingsFeature()],
});

export const createTagResource = (componentLoader) => ({
  resource: TagModel,
  features: [targetRelationSettingsFeature()],
});

```

---

### 2️⃣ Apply Owning Feature

Use `owningRelationSettingsFeature` on the resource that **owns** the relations:

```ts
import { owningRelationSettingsFeature } from '@elay-io/adminjs-relation';

export const createUserResource = () => ({
  resource: UserModel,
  features: [
    owningRelationSettingsFeature({
      componentLoader,
      relations,
      licenseKey: process.env.RELATIONS_LICENSE_KEY, // optional
    }),
  ],
});
```

---

### 3️⃣ Apply Target Feature (optional)

Use `targetRelationSettingsFeature` on the related resource to handle reverse logic:

```ts
import { targetRelationSettingsFeature } from '@elay-io/adminjs-relation';

export const createProjectResource = () => ({
  resource: ProjectModel,
  features: [targetRelationSettingsFeature()],
});
```

---

## 🔑 License System

- ✅ Fully free to use.  
- ✅ Without a key, you’ll see a one-time console message.  
- ✅ To remove the message, simply:
  1. Follow me on LinkedIn.  
  2. Star the GitHub repo.  
  3. Contact me—I’ll issue you a free license key to disable the message.

All features remain fully functional even without a key.

---

## 📚 API Summary

- **`owningRelationSettingsFeature(options)`**  
  Enable relations on the “owning” side.  
- **`targetRelationSettingsFeature()`**  
  Enable reverse handling on the related side.  
- **`RelationsFeatureOptions`**  
  TS interface for full relation configuration.

---

## 🔄 Overridable Components

The following components can be overridden to customize their behavior or appearance:

- **RelationsShowPropertyComponent**: Customize how relation properties are displayed.
- **RelationResourceActions**: Modify actions available for relation resources.
- **AddItemModal**: Change the content or behavior of the modal used for adding items.
- **RelationRecordsTable**: Customize the table displaying relation records.
- **RelationRecordInListActions**: Modify actions available for records in a list.
- **RelationConfigProvider**: Override configuration settings for relations.
- **RelationRecordInList**: Customize how individual records are displayed in a list.
- **RelationNoRecords**: Change the message or behavior when no records are present.
- **RelationTab**: Customize the tabs used for navigating relations.

### How to Override

To override a component, use the `allowOverride` function provided in the `shared/allow-override.tsx` file. For example:

```typescript
import { ComponentLoader } from 'adminjs';
import MyCustomComponent from './MyCustomComponent';

const componentLoader = new ComponentLoader();
componentLoader.override('RelationsShowPropertyComponent', MyCustomComponent);
```

This approach allows you to maintain customizations while still being able to update the core library or framework.


## 💡 Why not `@adminjs/relations`?

This plugin offers:

- Stronger TypeScript support  
- Cleaner configuration  
- Built-in soft-license system  
- Zero cost for core features

---

## ❤️ Contributing

1. Fork this repo.  
2. Create a feature branch.  
3. Commit & push.  
4. Open a PR.

---

## 📄 License

MIT

---

## 📬 Contact

- LinkedIn: https://www.linkedin.com/in/hero-truong/  
- GitHub: https://github.com/hero-truong/

---

## ✅ Production Ready

- ✅ Works with AdminJS 7.x+  
- ✅ Tested in multiple AdminJS projects  
- ✅ Simple integration for any AdminJS resource  


# Action Icons Utility

A small helper to override AdminJS action icons with your preferred Lucide‐React icon names, while still preserving any globally registered icons.

```
// src/utils/action-icons.ts

// Grab any icons already registered globally on window.AdminJS.icons,
// or fall back to an empty object if none exist.
const defaultIcons = (window as any).AdminJS?.icons || {};

// Define (or override) the built-in AdminJS action icons:
const ACTION_ICONS = {
  ...defaultIcons,
  show:   'Eye',    // “Show” action will use the Eye icon
  edit:   'Edit2',  // “Edit” action will use the Edit2 icon
  delete: 'Trash2', // “Delete” action will use the Trash2 icon
};

export default ACTION_ICONS;
```
