import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { db } from "../firebase/config";

import { useState, useEffect } from "react";
import { data } from "react-router-dom";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [userCreated, setUserCreated] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setUserCreated(false);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });

            setLoading(false);
            setUserCreated(true);

            return user;
        } catch (error) {

            let systemErrorMessage;

            if (error.code === "auth/weak-password") {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.code === "auth/email-already-in-use") {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(systemErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {

            let systemErrorMessage;

            if (error.code === "auth/invalid-credential") {
                systemErrorMessage = "Usuário ou senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setError(systemErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        logout,
        login,
        loading,
        userCreated
    };
};