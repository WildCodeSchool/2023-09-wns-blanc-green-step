import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/Button";
import Profil from "@/pages/profil";

describe("Testing different tabs", () => {
    it("render the profil with all tabs", () => {
        const click = jest.fn();
        render(<Profil />)

        const [infoPersoTab, mdpTab] = screen.getAllByRole("tab");
        

        expect(infoPersoTab).toHaveTextContent("Informations personnelles");
        expect(mdpTab).toHaveTextContent("Mot de passe");
    });
});