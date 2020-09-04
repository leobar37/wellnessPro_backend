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
const DetailPayment_1 = require("./DetailPayment");
let Payment = class Payment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ default: () => "CURRENT_DATE" }),
    __metadata("design:type", Date)
], Payment.prototype, "created", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Payment.prototype, "metadata", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Inscription_1.Inscription, (ins) => ins.payments),
    __metadata("design:type", Inscription_1.Inscription)
], Payment.prototype, "inscription", void 0);
__decorate([
    typeorm_1.OneToMany((type) => DetailPayment_1.DetailPayment, (detail) => detail.payment),
    __metadata("design:type", Array)
], Payment.prototype, "detaillsPayment", void 0);
Payment = __decorate([
    typeorm_1.Entity()
], Payment);
exports.Payment = Payment;
