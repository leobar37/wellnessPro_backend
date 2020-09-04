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
const typeorm_1 = require("typeorm");
const Inscription_1 = require("./Inscription");
const Question_1 = require("./Question");
let Pool = class Pool {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Pool.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("simple-json"),
    __metadata("design:type", String)
], Pool.prototype, "response", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Inscription_1.Inscription, (ins) => ins.pools, { nullable: false }),
    __metadata("design:type", Inscription_1.Inscription)
], Pool.prototype, "inscription", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Question_1.Question, (ques) => ques.pools, { nullable: false }),
    __metadata("design:type", Question_1.Question)
], Pool.prototype, "question", void 0);
Pool = __decorate([
    typeorm_1.Entity()
], Pool);
exports.Pool = Pool;
