import { Vehiculo } from "../_model/Vehiculo";
import { Page } from "src/app/_model/Page";

export class Contenido{
    content: Vehiculo[];
    totalPages: number;
    totalElements: number;
    pageable: Page[];
    sort: object;
}