import { Conductor } from '../_model/Conductor';
import { Page } from '../_model/Page';

export class ContenidoU {
    content: Conductor[];
    totalPages: number;
    totalElements: number;
    pageable: Page[];
    sort: object;
}