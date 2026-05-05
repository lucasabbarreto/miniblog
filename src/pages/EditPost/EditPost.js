import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {

        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);
            setTags(post.tagsArray.join(", "));
        }
    }, [post]);

    const { user } = useAuthValue();
    const { updateDocument, response } = useUpdateDocument("posts");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        try {
            new URL(image);
        } catch (error) {
            setFormError("Por favor, insira uma URL de imagem válida.");
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !body) {
            setFormError("Por favor, preencha todos os campos.");
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data);

        navigate("/dashboard");

    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar post</h2>
                    <p>Edite o seu post como quiser!</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input type="text" name="title" required placeholder="Pense num bom título..."
                                onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input type="text" name="image" required placeholder="Insira uma imagem que representa o seu post"
                                onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem:</p>
                        {image && <img src={image} alt={title} className={styles.image_preview} />}
                        <label>
                            <span>Conteúdo:</span>
                            <textarea name="body" required placeholder="Digite o conteúdo do seu post..."
                                onChange={(e) => setBody(e.target.value)} value={body} />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type="text" name="tags" placeholder="Digite tags separadas por vírgula..."
                                onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}
export default EditPost