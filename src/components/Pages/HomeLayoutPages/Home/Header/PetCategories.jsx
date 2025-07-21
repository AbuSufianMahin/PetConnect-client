import { PawPrint, Cat, Dog, Rabbit, Fish } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../../../../ui/card';

const categories = [
    { name: "Cats", icon: <Cat className="w-8 h-8" />, path: "/pets?category=cat" },
    { name: "Dogs", icon: <Dog className="w-8 h-8" />, path: "/pets?category=dog" },
    { name: "Rabbits", icon: <Rabbit className="w-8 h-8" />, path: "/pets?category=rabbit" },
    { name: "Fish", icon: <Fish className="w-8 h-8" />, path: "/pets?category=fish" },
    { name: "Others", icon: <PawPrint className="w-8 h-8" />, path: "/pets?category=others" },
];

const PetCategories = () => {
    const navigate = useNavigate();

    return (
        <section className="pt-12 pb-8 xl:pt-16 xl:pb-12 border-black bg-[#F1F1F9]">
            <div className='px-8 xl:px-16'>
                <h2 className="text-3xl font-bold text-center mb-8 font-delius-regular">Browse by Pet Category</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-2">
                    {categories.map((category, index) => (
                        <Card
                            key={index}
                            onClick={() => navigate(category.path)}
                            className="cursor-pointer group hover:bg-primary hover:text-white transition-all duration-300 ease-in-out shadow-md rounded-2xl"
                        >
                            <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
                                <div className="p-3 bg-muted rounded-full group-hover:bg-white group-hover:text-secondary transition">
                                    {category.icon}
                                </div>
                                <span className="font-bold text-lg">{category.name}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PetCategories;