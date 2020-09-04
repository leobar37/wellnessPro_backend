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
const Poll_1 = require("./Poll");
const Form_1 = require("./Form");
let Question = class Question {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("json"),
    __metadata("design:type", String)
], Question.prototype, "options", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Question.prototype, "required", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Poll_1.Pool, (pool) => pool.question),
    __metadata("design:type", Array)
], Question.prototype, "pools", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Form_1.Form, (form) => form.questions),
    typeorm_1.JoinColumn({ name: "id_form" }),
    __metadata("design:type", Form_1.Form)
], Question.prototype, "form", void 0);
Question = __decorate([
    typeorm_1.Entity()
], Question);
exports.Question = Question;
