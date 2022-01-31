import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
    override serialize(tree: UrlTree): any {
        const path = super.serialize(tree);

        if (path.endsWith('/')) {
            return path;
        }

        return `${path}/`;
    }
}