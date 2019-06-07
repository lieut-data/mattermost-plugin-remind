import {getConfig} from 'mattermost-redux/selectors/entities/general';

// import {getUserId} from 'selectors';

import {id as pluginId} from './manifest';

export const postDropdownMenuAction = openInteractiveDialog;

export function openInteractiveDialog() { //postId, registry) {
    return async () => { //dispatch, getState) => {
        const dialog = {
            url: 'http://localhost:8065/plugins/com.github.scottleedavis.mattermost-plugin-remind/dialog',
            dialog: {
                title: 'Schedule Reminder',
                elements: [
                    {
                        display_name: 'Message',
                        name: 'message',
                        type: 'text',
                        subtype: 'text',
                        default: '',
                        placeholder: '',
                        help_text: '',
                        optional: false,
                        min_length: 0,
                        max_length: 0,
                        data_source: '',
                        options: null,
                    },
                    {
                        display_name: 'Target',
                        name: 'target',
                        type: 'text',
                        subtype: 'text',
                        default: '',
                        placeholder: 'me',
                        help_text: '@user or ~channel',
                        optional: true,
                        min_length: 0,
                        max_length: 0,
                        data_source: '',
                        options: null,
                    },
                    {
                        display_name: 'Time',
                        name: 'time',
                        type: 'select',
                        subtype: 'select',
                        default: '',
                        placeholder: '',
                        help_text: '',
                        optional: false,
                        min_length: 0,
                        max_length: 0,
                        data_source: '',
                        options: [
                            {
                                text: '20 minutes',
                                value: '20min',
                            },
                            {
                                text: '1 hour',
                                value: '1hr',
                            },
                            {
                                text: '3 hours',
                                value: '3hr',
                            },
                            {
                                text: 'Tomorrow at 9AM',
                                value: 'tomorrow',
                            },
                            {
                                text: 'Next week',
                                value: 'nextweek',
                            },
                        ],
                    },
                ],
                submit_label: 'Schedule Reminder',
                notify_on_cancel: false,
            },
        };

        window.openInteractiveDialog(dialog);

    };
}

// TODO: Move this into mattermost-redux or mattermost-webapp.
export const getPluginServerRoute = (state) => {
    const config = getConfig(state);

    let basePath = '/';
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;

        if (basePath && basePath[basePath.length - 1] === '/') {
            basePath = basePath.substr(0, basePath.length - 1);
        }
    }

    return basePath + '/plugins/' + pluginId;
};

// export const getStatus = () => async (dispatch, getState) => {
//     fetch(getPluginServerRoute(getState()) + '/status').then((r) => r.json()).then((r) => {
//         dispatch({
//             type: STATUS_CHANGE,
//             data: r.enabled,
//         });
//     });
// };
//
// export const websocketStatusChange = (message) => (dispatch) => dispatch({
//     type: STATUS_CHANGE,
//     data: message.data.enabled,
// });
