const validate = (scheme, source = 'all') => {
  return (req, res, next) => {
    let data
    switch (source) {
      case 'params':
        data = req.params
        break
      case 'query':
        data = req.query
        break
      case 'body':
        data = req.body
        break
      default:
        data = { ...req.params, ...req.query, ...req.body }
    }

    const { error } = scheme.validate(data)
    if (error) {
      next(error)
    } else {
      next()
    }
  }
}

export default validate
