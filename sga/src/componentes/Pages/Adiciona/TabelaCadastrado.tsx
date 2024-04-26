import React, { useState } from 'react';

type Action = { type: string; payload: any };
type TabelaCadastroProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<Action>
}

const TabelaCadastrado: React.FC<TabelaCadastroProps> = ({ isVisible, setIsVisible }) => {
    return (
        <div className="tabela-cadastro">
            {/* Seu conteúdo da tabela aqui */}
        </div>
    );
};

export default TabelaCadastrado;
