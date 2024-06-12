import React from 'react';
import { render } from '@testing-library/react';
import { PictureUpload } from '@/components/PictureUpload';


describe('PictureUpload component', () => {
    test('renders with default image when no imgUrl is provided', () => {
        const { getByAltText } = render(<PictureUpload />);
        const imgElement = getByAltText('Avatar de l\'utilisateur'); // Mettez à jour le texte en conséquence
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', '/images/blank-avatar.png');
    });
});