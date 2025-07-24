"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRepository = void 0;
const common_1 = require("@nestjs/common");
const fs = require("node:fs/promises");
const path = require("node:path");
const PATH = path.join(__dirname, '../quote/quotes.json');
let QuoteRepository = class QuoteRepository {
    async loadAll() {
        try {
            const data = await fs.readFile(PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch (err) {
            console.error(err);
            throw new Error('Could not load quotes');
        }
    }
};
exports.QuoteRepository = QuoteRepository;
exports.QuoteRepository = QuoteRepository = __decorate([
    (0, common_1.Injectable)()
], QuoteRepository);
//# sourceMappingURL=quote.repository.js.map