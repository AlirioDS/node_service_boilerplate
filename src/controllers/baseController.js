export const root = async ( req, res ) => {
  return res.status(200).json({
    info: "Services API's",
    company: "Copyright Todos los Derechos reservados",
    year: "2023"
  })
}
