from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 문장을 한국어로 번역해줘:\n\n{sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)
llm = OpenAI(
    temperature=0.3, # 번역할거니 최대한 정확하게 창의력을 최소화해서...
    max_tokens=1024, # 글이 짤리면 최대 토큰수 증가
) 

chain = prompt | llm | RunnableLambda(lambda x : {'translated': x.strip()})

result = chain.invoke({'sentence': 
"""
It had only been 86 years since humanity left the solar system. But that day, beneath the sky of Triton-5b, 42 light-years from Earth, I realized just how small we truly are.
I’m Dr. Rian, an astronomer aboard the starship Spectra. Our mission was to trace the remnants of a neutron star collision near a local cluster and search for conditions that might support primitive life. We deployed a Very Large Telescope (VLT) directly in space, analyzing electromagnetic spectra to trace the explosion that occurred millions of years ago.
Then we detected something strange—signals from the neutron star remnants that repeated at precisely 3.141-second intervals. It wasn’t random radiation. The signal's intensity diminished in a pattern following the golden ratio. Such mathematical beauty couldn’t be natural. It might be… artificial.
We designated the signal’s origin as “Triton-7” and urgently launched a probe. There, on the planet’s surface, we discovered a massive hexagonal structure glowing with its own light—one that seemed to react, as if it noticed us.
From that moment, I no longer saw stars as mere balls of gas and gravity—but as a language. Maybe astronomy isn’t just about numbers and formulas. Maybe… it’s the beginning of a conversation.
"""
})

print('한글번역본: ', result['translated'])
