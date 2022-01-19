<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table(name="product", indexes={@ORM\Index(name="IDX_D34A04AD34645A1F", columns={"fk_category"}), @ORM\Index(name="IDX_D34A04ADE516765E", columns={"fk_period"}), @ORM\Index(name="IDX_D34A04ADA35CF44A", columns={"fk_country"})})
 * @ORM\Entity
 */
class Product
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_product", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="product_id_product_seq", allocationSize=1, initialValue=1)
     */
    private $idProduct;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=1000, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=500, nullable=true)
     */
    private $image;

    /**
     * @var string|null
     *
     * @ORM\Column(name="price", type="decimal", precision=10, scale=0, nullable=true)
     */
    private $price;

    /**
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_category", referencedColumnName="id_category")
     * })
     */
    private $fkCategory;

    /**
     * @var \Period
     *
     * @ORM\ManyToOne(targetEntity="Period")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_period", referencedColumnName="id_period")
     * })
     */
    private $fkPeriod;

    /**
     * @var \Country
     *
     * @ORM\ManyToOne(targetEntity="Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_country", referencedColumnName="id_country")
     * })
     */
    private $fkCountry;


    /**
     * Get idProduct.
     *
     * @return int
     */
    public function getIdProduct()
    {
        return $this->idProduct;
    }

    /**
     * Set name.
     *
     * @param string|null $name
     *
     * @return Product
     */
    public function setName($name = null)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Product
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set image.
     *
     * @param string|null $image
     *
     * @return Product
     */
    public function setImage($image = null)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return string|null
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set price.
     *
     * @param string|null $price
     *
     * @return Product
     */
    public function setPrice($price = null)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return string|null
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set fkCategory.
     *
     * @param \Category|null $fkCategory
     *
     * @return Product
     */
    public function setFkCategory(\Category $fkCategory = null)
    {
        $this->fkCategory = $fkCategory;

        return $this;
    }

    /**
     * Get fkCategory.
     *
     * @return \Category|null
     */
    public function getFkCategory()
    {
        return $this->fkCategory;
    }

    /**
     * Set fkPeriod.
     *
     * @param \Period|null $fkPeriod
     *
     * @return Product
     */
    public function setFkPeriod(\Period $fkPeriod = null)
    {
        $this->fkPeriod = $fkPeriod;

        return $this;
    }

    /**
     * Get fkPeriod.
     *
     * @return \Period|null
     */
    public function getFkPeriod()
    {
        return $this->fkPeriod;
    }

    /**
     * Set fkCountry.
     *
     * @param \Country|null $fkCountry
     *
     * @return Product
     */
    public function setFkCountry(\Country $fkCountry = null)
    {
        $this->fkCountry = $fkCountry;

        return $this;
    }

    /**
     * Get fkCountry.
     *
     * @return \Country|null
     */
    public function getFkCountry()
    {
        return $this->fkCountry;
    }
}
