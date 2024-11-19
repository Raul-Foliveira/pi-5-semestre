import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PetDetails from '../../components/PetDetails';



const PetPage = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Verifica se o ID foi carregado da URL
        if (!id) return;

        const fetchPetDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/animals/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setPet(data);
                } else {
                    setError('Animal não encontrado');
                }
            } catch (err) {
                setError('Erro ao buscar detalhes do animal');
            } finally {
                setLoading(false);
            }
        };

        fetchPetDetails();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!pet) return <div>Pet não encontrado</div>;

    return <PetDetails pet={pet} />;
};

export default PetPage;
