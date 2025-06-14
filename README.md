# @hero/adminjs-relations

Enhanced relation components for AdminJS with improved maintainability and TypeScript support.

## Installation

```bash
npm install @hero/adminjs-relations
# or
yarn add @hero/adminjs-relations
```

## Features

- 🚀 Enhanced relation components with TypeScript support
- 🎨 Improved UI/UX for managing relations
- 📦 Support for both one-to-many and many-to-many relationships
- 🔍 Better filtering and search capabilities
- 💪 Strongly typed components and hooks

## Usage

```tsx
import { RelationsShowProperty, RelationsListProperty, RelationsEditProperty } from '@hero/adminjs-relations';

// Use in your AdminJS resource configuration
const adminJsOptions = {
  resources: [{
    resource: YourModel,
    options: {
      properties: {
        relationField: {
          components: {
            show: RelationsShowProperty,
            list: RelationsListProperty,
            edit: RelationsEditProperty,
          },
        },
      },
    },
  }],
};
```

## API Documentation

### Components

#### `RelationsShowProperty`
Display component for showing related records.

#### `RelationsListProperty`
Component for listing related records with filtering and pagination.

#### `RelationsEditProperty`
Component for editing relations, supporting both one-to-many and many-to-many.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details. 