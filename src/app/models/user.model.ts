export class User {
    public name: string;
    public password: string;
    public email: string;
    public cpf: string;
    public birthdate: string;
    public gender: string;
    public skin_color: string;
    public cellphone: string;
    public phone: string;
    public status: string;
}

export class Page {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
};

export class Links {
    previous: string;
    next: string;
};