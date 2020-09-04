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
const Payment_1 = require("./Payment");
const Product_1 = require("./Product");
let DetailPayment = class DetailPayment {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: "id_payment" }),
    __metadata("design:type", String)
], DetailPayment.prototype, "idPayment", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ name: "id_product" }),
    __metadata("design:type", Number)
], DetailPayment.prototype, "idProduct", void 0);
__decorate([
    typeorm_1.Column("smallint"),
    __metadata("design:type", Number)
], DetailPayment.prototype, "cant", void 0);
__decorate([
    typeorm_1.Column("float", { nullable: true }),
    __metadata("design:type", Number)
], DetailPayment.prototype, "price", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Payment_1.Payment, (pay) => pay.detaillsPayment),
    typeorm_1.JoinColumn({ name: "id_payment" }),
    __metadata("design:type", Payment_1.Payment)
], DetailPayment.prototype, "payment", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Product_1.Product, (pr) => pr.detailsPaymen),
    typeorm_1.JoinColumn({ name: "id_product" }),
    __metadata("design:type", Product_1.Product)
], DetailPayment.prototype, "product", void 0);
DetailPayment = __decorate([
    typeorm_1.Entity("detail_payment")
], DetailPayment);
exports.DetailPayment = DetailPayment;
