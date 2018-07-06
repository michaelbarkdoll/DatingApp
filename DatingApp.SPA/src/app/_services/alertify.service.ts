import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable()
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
        if (e) {
            okCallback();
        } else {
            // else statement being empty means,
            // If the cancel button is clicked the dialog will disappear
        }
    });
}

success(message: string) {
    alertify.success(message);
}

error(message: string) {
    alertify.error(message);
}

warning(message: string) {
    alertify.warning(message);
}

message(message: string) {
    alertify.message(message);
}

}
