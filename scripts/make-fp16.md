The GPU model `public/models/minilm/model_fp16.onnx` was made from the fp32 all-MiniLM-L6-v2 ONNX export with ONNX Runtime's BERT optimizer:

```python
from onnxruntime.transformers import optimizer
m = optimizer.optimize_model("model.onnx", model_type="bert", num_heads=12, hidden_size=384, opt_level=0)
m.convert_float_to_float16(keep_io_types=True)
m.save_model_to_file("model_fp16.onnx")
```

Check: "This is an example sentence" → first values 0.0677, 0.0636, 0.0488, 0.0795, 0.0374 (reference 0.0677, 0.0635, 0.0487, 0.0793, 0.0374); cosine vs fp32 = 1.000, vs the int8 CPU model ≥ 0.9993.
