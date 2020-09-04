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
const User_1 = require("./User");
const Payment_1 = require("./Payment");
const Poll_1 = require("./Poll");
let Inscription = class Inscription {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Inscription.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("timestamp", { default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Inscription.prototype, "create", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Inscription.prototype, "expiration", void 0);
__decorate([
    typeorm_1.Column("float4"),
    __metadata("design:type", Number)
], Inscription.prototype, "amount", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => User_1.User, (user) => user.Inscriptions),
    typeorm_1.JoinColumn({ name: "id_user" }),
    __metadata("design:type", User_1.User)
], Inscription.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Payment_1.Payment, (pay) => pay.inscription),
    __metadata("design:type", Array)
], Inscription.prototype, "payments", void 0);
__decorate([
    typeorm_1.OneToMany((type) => Poll_1.Pool, (ins) => ins.inscription),
    __metadata("design:type", Array)
], Inscription.prototype, "pools", void 0);
Inscription = __decorate([
    typeorm_1.Entity()
], Inscription);
exports.Inscription = Inscription;
