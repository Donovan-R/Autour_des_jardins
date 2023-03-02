import React, { useState } from 'react';
import { SimpleSlider } from '../components/SimpleSlider';
import { FaRegPaperPlane } from 'react-icons/fa';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <section className='section'>
        <h2>Accueil</h2>
        <div className='sliderHome'>
          <SimpleSlider />
        </div>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            consequuntur officia earum laborum accusamus dolor animi deleniti
            nulla autem, perspiciatis omnis cum sint, nesciunt ut provident.
            Assumenda repellendus quia blanditiis nisi numquam nobis porro,
            aliquid animi expedita qui vel ab, velit autem nam sapiente! Dolor
            earum excepturi minus corrupti illum cumque porro pariatur. Ipsa
            dignissimos officia mollitia quasi nostrum nobis molestias eum a
            dicta, accusantium distinctio voluptatem ab inventore iste beatae
            itaque quo quisquam voluptate nemo sunt laudantium doloremque
            ducimus perspiciatis! Eius, unde odio? Magni fugit quam laborum
            necessitatibus accusamus libero vero asperiores aspernatur qui,
            corrupti quae esse quas, officia tenetur est sit. Esse dolore error
            est tenetur nisi nostrum quasi obcaecati magnam voluptatem deleniti
            voluptate aperiam inventore nam, vel ratione, ut cupiditate nihil,
            exercitationem veritatis. Totam expedita aperiam accusantium nisi
            incidunt ratione ab, blanditiis deleniti illum, itaque, vel sequi
            laboriosam velit! Et doloremque, dolore iusto sint quas sunt
            deserunt tempore nobis temporibus blanditiis optio numquam vel
            voluptates quidem. Saepe quo alias, eligendi dolore culpa obcaecati
            molestia
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
