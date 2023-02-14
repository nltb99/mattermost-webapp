// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Modal} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import {UserProfile} from '@mattermost/types/users';
import {ActionFunc} from 'mattermost-redux/types/actions';

import * as Utils from 'utils/utils';
import {ServerError} from '@mattermost/types/errors';

interface PasswordConfig {
    minimumLength: number;
    requireLowercase: boolean;
    requireNumber: boolean;
    requireSymbol: boolean;
    requireUppercase: boolean;
}

type State = {
    serverErrorPassword: React.ReactNode;
    serverErrorCurrentUsername: React.ReactNode;
    serverErrorCurrentEmail: React.ReactNode;
};

type Props = {
    user?: UserProfile;
    currentUserId: string;
    show: boolean;
    onModalSubmit: (user?: UserProfile) => void;
    onModalDismissed: () => void;
    passwordConfig: PasswordConfig;
    actions: {
        createUser: (
            user: UserProfile,
            token: string,
            inviteId: string,
            redirect: string
        ) => ActionFunc;
    };
};

export default class CreateUserModal extends React.PureComponent<Props, State> {
    private emailRef: React.RefObject<HTMLInputElement>;
    private usernameRef: React.RefObject<HTMLInputElement>;
    private passwordRef: React.RefObject<HTMLInputElement>;
    public static defaultProps: Partial<Props> = {
        show: false,
    };

    public constructor(props: Props) {
        super(props);

        this.state = {
            serverErrorPassword: null,
            serverErrorCurrentUsername: null,
            serverErrorCurrentEmail: null,
        };

        this.emailRef = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    public componentWillUnmount(): void {
        this.setState({
            serverErrorPassword: null,
            serverErrorCurrentUsername: null,
            serverErrorCurrentEmail: null,
        });
    }

    private doSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        const currentEmail = (this.emailRef.current as HTMLInputElement).value;

        if (currentEmail === '') {
            const errorMsg = (
                <FormattedMessage
                    id='admin.userManagement.createUser.missing_email'
                    defaultMessage='Please enter your email.'
                />
            );
            this.setState({serverErrorCurrentEmail: errorMsg});
            return;
        }

        const currentUsername = (this.usernameRef.current as HTMLInputElement).
            value;

        if (currentUsername === '') {
            const errorMsg = (
                <FormattedMessage
                    id='admin.userManagement.createUser.missing_username'
                    defaultMessage='Please enter your username.'
                />
            );
            this.setState({serverErrorCurrentUsername: errorMsg});
            return;
        }

        const password = (this.passwordRef.current as HTMLInputElement).value;

        const {valid, error} = Utils.isValidPassword(
            password,
            this.props.passwordConfig,
        );

        if (!valid && error) {
            this.setState({serverErrorPassword: error});
            return;
        }

        this.setState({serverErrorPassword: null});

        const redirectTo = '';
        const token = '';
        const inviteId = '';

        const user = {
            email: currentEmail.trim(),
            username: currentUsername.trim().toLowerCase(),
            password: password.trim(),
        } as UserProfile;

        const result = await this.props.actions.createUser(
            user,
            token,
            inviteId,
            redirectTo,
        );

        if (
            'error' in result &&
            (result.error as unknown as ServerError).message.includes('email')
        ) {
            this.setState({
                serverErrorCurrentEmail: (
                    result.error as unknown as ServerError
                ).message,
            });

            return;
        }

        this.setState({serverErrorCurrentEmail: null});

        if (
            'error' in result &&
            (result.error as unknown as ServerError).message.includes(
                'username',
            )
        ) {
            this.setState({
                serverErrorCurrentUsername: (
                    result.error as unknown as ServerError
                ).message,
            });

            return;
        }

        this.setState({serverErrorCurrentUsername: null});

        this.props.onModalSubmit(this.props.user);
    };

    private doCancel = (): void => {
        this.setState({
            serverErrorPassword: null,
            serverErrorCurrentUsername: null,
            serverErrorCurrentEmail: null,
        });
        this.props.onModalDismissed();
    };

    public render(): JSX.Element {
        const urlClass = 'input-group input-group--limit';
        let urlClassCurrentEmail = urlClass;
        let urlClassCurrentUser = urlClass;
        let urlClassCurrentPass = urlClass;

        let serverErrorCurrentEmail = null;
        let serverErrorPassword = null;
        let serverErrorCurrentUsername = null;

        if (this.state.serverErrorCurrentEmail) {
            urlClassCurrentEmail += ' has-error';
            serverErrorCurrentEmail = (
                <div className='has-error'>
                    <p className='input__help error'>
                        {this.state.serverErrorCurrentEmail}
                    </p>
                </div>
            );
        }

        if (this.state.serverErrorCurrentUsername) {
            urlClassCurrentUser += ' has-error';
            serverErrorCurrentUsername = (
                <div className='has-error'>
                    <p className='input__help error'>
                        {this.state.serverErrorCurrentUsername}
                    </p>
                </div>
            );
        }

        if (this.state.serverErrorPassword) {
            urlClassCurrentPass += ' has-error';
            serverErrorPassword = (
                <div className='has-error'>
                    <p className='input__help error'>
                        {this.state.serverErrorPassword}
                    </p>
                </div>
            );
        }

        return (
            <Modal
                dialogClassName='a11y__modal'
                show={this.props.show}
                onHide={this.doCancel}
                role='dialog'
                aria-labelledby='createUserModalLabel'
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title
                        componentClass='h1'
                        id='createUserModalLabel'
                    >
                        Create User
                    </Modal.Title>
                </Modal.Header>
                <form
                    role='form'
                    className='form-horizontal'
                >
                    <Modal.Body>
                        {/* // ? */}
                        <div className='form-group'>
                            <div className='col-sm-10 password__group-addon-space'>
                                <div className={urlClassCurrentEmail}>
                                    <span
                                        data-toggle='tooltip'
                                        title='Email'
                                        className='input-group-addon password__group-addon'
                                    >
                                        <FormattedMessage
                                            id='admin.userManagement.createUser.email'
                                            defaultMessage='Email'
                                        />
                                    </span>
                                    <input
                                        ref={this.emailRef}
                                        type='email'
                                        className='form-control'
                                        autoFocus={true}
                                    />
                                </div>
                                {serverErrorCurrentEmail}
                            </div>
                            <div className='col-sm-10 password__group-addon-space'>
                                <div className={urlClassCurrentUser}>
                                    <span
                                        data-toggle='tooltip'
                                        title='Username'
                                        className='input-group-addon password__group-addon'
                                    >
                                        <FormattedMessage
                                            id='admin.userManagement.createUser.username'
                                            defaultMessage='Username'
                                        />
                                    </span>
                                    <input
                                        ref={this.usernameRef}
                                        className='form-control'
                                        autoFocus={false}
                                    />
                                </div>
                                {serverErrorCurrentUsername}
                            </div>
                            <div className='col-sm-10'>
                                <div className={urlClassCurrentPass}>
                                    <span
                                        data-toggle='tooltip'
                                        title='Password'
                                        className='input-group-addon password__group-addon'
                                    >
                                        <FormattedMessage
                                            id='admin.userManagement.createUser.password'
                                            defaultMessage='Password'
                                        />
                                    </span>
                                    <input
                                        type='password'
                                        ref={this.passwordRef}
                                        className='form-control'
                                        autoFocus={false}
                                    />
                                </div>
                                {serverErrorPassword}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type='button'
                            className='btn btn-link'
                            onClick={this.doCancel}
                        >
                            <FormattedMessage
                                id='admin.userManagement.createUser.cancel'
                                defaultMessage='Cancel'
                            />
                        </button>
                        <button
                            onClick={this.doSubmit}
                            type='submit'
                            className='btn btn-primary'
                        >
                            <FormattedMessage
                                id='admin.userManagement.createUser.create'
                                defaultMessage='Create'
                            />
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
