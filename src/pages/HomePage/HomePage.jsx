import "./Homepage.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useQuery } from "graphql-hooks";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductGridGL } from "../../components/ProductGridGL/ProductGridGL";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { HomepageQuery } from "../../services/datocmsService";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const { loading, error, data } = useQuery(HomepageQuery);

  const [products, setProducts] = useState([]);
  const [productsGL, setProductsGL] = useState([]);
  const [listSizes, setListSizes] = useState({});
  const [isLoading, setIsLoading] = useState(loading);
  const [velocity, setVelocity] = useState(0);
  const [progress, setProgress] = useState(0);

  const timelineRef = useRef(null);
  const productListref = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const data = await getProducts();
        // // data.sort(() => Math.random() - 0.5);
        // setProducts(data);
        // setIsLoading(false);

        if (!loading && !error) {
          const {
            allDigitalArtGalleries,
            allIllustrationGalleries,
            allPhotographyGalleries,
            allStreetArtGalleries,
          } = data;

          const d = [
            ...allDigitalArtGalleries,
            ...allIllustrationGalleries,
            ...allPhotographyGalleries,
            ...allStreetArtGalleries,
          ].map((item) => {
            return {
              docId: item.id,
              name: item.headline,
              image: item.image.url,
            };
          });

          setProducts(d);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProducts();

    return () => {};
  }, [data, error, loading]);

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });

    if (products) {
      onProductsLoad(timeline);

      const list = productListref.current;
      if (list) {
        const p = list.children;
        for (const product of p) {
          const i = product.querySelector("img");
          const pd = i.getBoundingClientRect();
          pd.image = i.src;

          setProductsGL((prev) => [...prev, pd]);
        }

        const { width, height } = list.getBoundingClientRect();
        setListSizes({ width, height });
      }
    }

    timelineRef.current = timeline;
    timelineRef.current.play();
  }, [products]);

  const onProductsLoad = (timeline) => {
    timeline.from(
      productListref.current.children,
      {
        duration: 1,
        opacity: 0,
        y: -100,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const t = gsap.timeline({ paused: true });
    t.to(section, {
      scrollTrigger: {
        markers: true,
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (d) => {
          const progress = d.progress;
          const velocity = Math.floor(Math.abs(d.getVelocity()) * 0.01);

          gsap.to(productListref.current, {
            gap: velocity * 0.1 + "rem",
          });

          setProgress(progress);
          setVelocity(velocity);
        },
      },
    });
  }, [isLoading]);

  return (
    <section ref={sectionRef} className="homepage">
      {isLoading && <LoadingScreen />}

      <div className="homepage--grid-gl">
        <ProductGridGL
          images={productsGL}
          progress={progress}
          listSizes={listSizes}
          velocity={velocity}
        />
      </div>

      <ul ref={productListref} className="homepage--grid">
        {products.map((product) => (
          <li key={product.docId} className="homepage--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
