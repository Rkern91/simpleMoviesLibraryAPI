/**
 * Remove um campo passado no objeto caso ele exista.
 * @param obj
 * @param key
 */
export const removeObjKey = async (obj: object, key: string) => {
  try
  {
    if (key in obj)
      delete obj[key.toString()];

    return obj;
  }
  catch (error)
  {
    throw ('Erro ao remover chave do objeto: ' + error);
  }
}