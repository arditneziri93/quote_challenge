"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesController = void 0;
const common_1 = require("@nestjs/common");
const quote_service_1 = require("./quote.service");
let QuotesController = class QuotesController {
    quotesService;
    constructor(quotesService) {
        this.quotesService = quotesService;
    }
    findAll() {
        const quotes = this.quotesService.findAll();
        return `<div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 100px;
  ">
    ${quotes
            .map((q) => `
      <div style="text-align: center">
        <h3>${q.quote}</h3>
        <p>– ${q.author}</p>
      </div>
    `)
            .join('')}
</div>`;
    }
    findRandom() {
        const quote = this.quotesService.findRandom();
        return `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      flex-direction: column;
      gap: 1rem;
      background-image: url('https://media1.tenor.com/m/B7vSc-79QXAAAAAd/mindblow-mind-explosion.gif');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 2rem;
    ">
      <h1>${quote.quote}</h1>
      <p>– ${quote.author}</p>
    </div>
  `;
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], QuotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], QuotesController.prototype, "findRandom", null);
exports.QuotesController = QuotesController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [quote_service_1.QuotesService])
], QuotesController);
//# sourceMappingURL=quote.controller.js.map