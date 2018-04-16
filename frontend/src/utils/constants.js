
export function getToken() {
    return localStorage.getItem('token') || ''
}

export let notifyStyle = {
            NotificationItem: {
                DefaultStyle: {
                    fontSize: '19px',
                    margin: '10px 0px 0px',
                    padding: '20px',
                    borderRadius: '6px',
                    borderTop: '0px',
                    color: '#FFF',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 14px',
                },
                success: {
                    backgroundColor: 'rgb(129, 179, 69)',
                },
                error: {
                    backgroundColor: 'rgb(255, 0, 0)',
                },
                info:{
                    backgroundColor: 'rgb(115, 174, 204)',
                },
                warning:{
                    backgroundColor: 'rgb(214, 189, 69)',
                }
            }
}

export let tabletBreak = 1024



