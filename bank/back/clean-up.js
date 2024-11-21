import './utils/config.js';
import { PendingUser, User } from './utils/mongo-models.js';

await User.deleteMany({});
await PendingUser.deleteMany({});

process.exit(0);
