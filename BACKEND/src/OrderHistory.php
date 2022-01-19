<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * OrderHistory
 *
 * @ORM\Table(name="order_history", indexes={@ORM\Index(name="IDX_D1C0D900E7EA6CC5", columns={"fk_client"}), @ORM\Index(name="IDX_D1C0D90023653981", columns={"fk_product"})})
 * @ORM\Entity
 */
class OrderHistory
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_order", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $idOrder;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="date", type="date", nullable=true)
     */
    private $date;

    /**
     * @var \Client
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Client")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_client", referencedColumnName="id_client")
     * })
     */
    private $fkClient;

    /**
     * @var \Product
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Product")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="fk_product", referencedColumnName="id_product")
     * })
     */
    private $fkProduct;


    /**
     * Set idOrder.
     *
     * @param int $idOrder
     *
     * @return OrderHistory
     */
    public function setIdOrder($idOrder)
    {
        $this->idOrder = $idOrder;

        return $this;
    }

    /**
     * Get idOrder.
     *
     * @return int
     */
    public function getIdOrder()
    {
        return $this->idOrder;
    }

    /**
     * Set date.
     *
     * @param \DateTime|null $date
     *
     * @return OrderHistory
     */
    public function setDate($date = null)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date.
     *
     * @return \DateTime|null
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set fkClient.
     *
     * @param \Client $fkClient
     *
     * @return OrderHistory
     */
    public function setFkClient(\Client $fkClient)
    {
        $this->fkClient = $fkClient;

        return $this;
    }

    /**
     * Get fkClient.
     *
     * @return \Client
     */
    public function getFkClient()
    {
        return $this->fkClient;
    }

    /**
     * Set fkProduct.
     *
     * @param \Product $fkProduct
     *
     * @return OrderHistory
     */
    public function setFkProduct(\Product $fkProduct)
    {
        $this->fkProduct = $fkProduct;

        return $this;
    }

    /**
     * Get fkProduct.
     *
     * @return \Product
     */
    public function getFkProduct()
    {
        return $this->fkProduct;
    }
}
