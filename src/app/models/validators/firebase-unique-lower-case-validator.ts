import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

export class FirebaseUniqueLowerCaseValidator {
    static options(afs: AngularFirestore, collection: string, field: string) {
        return (control: AbstractControl) => {
            const username = control.value.toLowerCase();

            return afs.collection(collection, ref => ref.where(field, '==', username))
                .valueChanges().pipe(
                    debounceTime(1000),
                    take(1),
                    map(arr => arr.length ? { usernameAvalible: false } : null)
                );
        };
    }
}
