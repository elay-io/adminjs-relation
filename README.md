# @hero-truong/adminjs-relations-hero

> Advanced relation management feature for AdminJS — fully free to use with optional license system.

---

╭────────────────────────────────────────────────────────────╮  
│ 🎉 Thank you for using @adminjs/relations-hero!           │  
│                                                            │  
│ ✅ This package is free to use.                            │  
│                                                            │  
│ 🙏 If you find it helpful, you can support the project by: │  
│   👉 Follow me on LinkedIn: https://www.linkedin.com/in/hero-truong/ │  
│   👉 Give a star on GitHub: https://github.com/hero-truong │  
│                                                            │  
│ 🎁 If you follow & contact me, I can provide you a license │  
│    key to remove this message permanently.                 │  
╰────────────────────────────────────────────────────────────╯

---

## 📖 Introduction

`@hero-truong/adminjs-relations-hero` is an enhanced relations plugin for [AdminJS](https://adminjs.co/) which helps you easily manage both **one-to-many** and **many-to-many** relationships inside AdminJS resources.

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

Using **NPM**:

```bash
npm install @hero-truong/adminjs-relations-hero
```

Using **Yarn**:

```bash
yarn add @hero-truong/adminjs-relations-hero
```

Using **PNPM**:

```bash
pnpm add @hero-truong/adminjs-relations-hero
```

---

## 🛠 Basic Usage

### 1️⃣ Define Relations Configuration

Define your relations using the `RelationsFeatureOptions` type:

```ts
import { RelationsFeatureOptions } from '@hero-truong/adminjs-relations-hero';

const relations: RelationsFeatureOptions['relations'] = {
  UserAssignments: {
    type: 'many-to-many',
    junction: {
      joinKey: 'granterId',
      inverseJoinKey: 'targetUserId',
      throughResourceId: 'UserAssignment',
    },
    target: { resourceId: 'User' },
  },
  Projects: {
    type: 'one-to-many',
    target: { resourceId: 'Project', foreignKey: 'ownerId' },
  },
};
```

---

### 2️⃣ Apply Owning Feature

Use `owningRelationSettingsFeature` on the resource that **owns** the relations:

```ts
import { owningRelationSettingsFeature } from '@hero-truong/adminjs-relations-hero';

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
import { targetRelationSettingsFeature } from '@hero-truong/adminjs-relations-hero';

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
